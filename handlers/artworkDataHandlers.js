const Met = require('../models/metdatas'); 
const Cleveland = require("../models/clevelanddatas");
require('dotenv').config(); // Importer les variables d'environnement depuis le fichier .env
const { NEXT_PUBLIC_HARVARD_API_KEY } = process.env; // Récupérer la clé API depuis les variables d'environnement
const fetch = require('node-fetch');

// Définir les fonctions de récupération de données pour chaque musée
const getHarvardArtwork = async (objectID) => {
    // Implémenter la logique pour récupérer les données depuis Harvard Art Museums (API Fetch)
    try {
        const response = await fetch(`https://api.harvardartmuseums.org/object/${objectID}?apikey=${NEXT_PUBLIC_HARVARD_API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Harvard artwork data:", error);
        throw error; // Gérer les erreurs
    }
};

const getChicagoArtwork = async (objectID) => {
    // Implémenter la logique pour récupérer les données depuis Art Institute of Chicago (API Fetch)
    try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${objectID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Chicago artwork data:", error);
        throw error; // Gérer les erreurs
    }
};

const getClevelandArtwork = async (objectID) => {
    // Implémenter la logique pour récupérer les données depuis Cleveland Museum of Art (MongoDB)
    try {
        const artwork = await Cleveland.findOne({ id: objectID });
        return artwork; // Retourne l'objet trouvé dans la base de données MongoDB
    } catch (error) {
        console.error("Error fetching Cleveland artwork data:", error);
        throw error; // Gérer les erreurs
    }
};

const getMETArtwork = async (objectID) => {
    // Implémenter la logique pour récupérer les données depuis MET Museum (MongoDB)
    try {
        const artwork = await Met.findOne({ objectID });
        return artwork; // Retourne l'objet trouvé dans la base de données MongoDB
    } catch (error) {
        console.error("Error fetching MET artwork data:", error);
        throw error; // Gérer les erreurs
    }
};

module.exports = { getHarvardArtwork, getChicagoArtwork, getClevelandArtwork, getMETArtwork };
