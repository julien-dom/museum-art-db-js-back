const Met = require("../models/metdatas");
const Cleveland = require("../models/clevelanddatas");
require("dotenv").config(); // Importer les variables d'environnement depuis le fichier .env
const { NEXT_PUBLIC_HARVARD_API_KEY } = process.env; // Récupérer la clé API depuis les variables d'environnement
const fetch = require("node-fetch");

// Définir les fonctions de récupération de données pour chaque musée
const getHarvardArtwork = async (objectID) => {
  // Implémenter la logique pour récupérer les données depuis Harvard Art Museums (API Fetch)
  try {
    const response = await fetch(
      `https://api.harvardartmuseums.org/object/${objectID}?apikey=${NEXT_PUBLIC_HARVARD_API_KEY}`
    );
    const data = await response.json();

    // Récupérer l'URL de l'image
    let image = data.primaryimageurl;
    // Redimensionner l'image si une URL est disponible
    if (image) {
      image = `${image}?height=500&width=500`;
    }

    // Créer un nouvel objet avec les éléments sélectionnés
    const selectedData = {
      objectID: data.objectid,
      museum: "Harvard Museums Collection",
      classification: data.classification,
      author:
        data.people && data.people.length > 0
          ? data.people[0]?.name
          : "Unknown",
      image: image,
      title: data.title,
      description: data.description,
      technique: data.technique,
      dimensions: data.dimensions,
      date: data.dated,

      // Ajoutez d'autres propriétés selon vos besoins
    };

    return selectedData;
  } catch (error) {
    console.error("Error fetching Harvard artwork data:", error);
    throw error; // Gérer les erreurs
  }
};

const getChicagoArtwork = async (objectID) => {
  // Implémenter la logique pour récupérer les données depuis Art Institute of Chicago (API Fetch)
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${objectID}`
    );
    const data = await response.json();
    // Récupérer l'URL de l'image
    let image = `https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg`;

    // Récupérer les données sur la technique si technique_id est présent
    let technique = null;
    if (data.data.technique_id !== null) {
      const techniqueResponse = await fetch(
        `https://api.artic.edu/api/v1/category-terms/${data.data.technique_id}`
      );
      const techniqueData = await techniqueResponse.json();
      technique = techniqueData.data.title;
    }

    // Créer un nouvel objet avec les éléments sélectionnés
    const selectedData = {
      objectID: data.data.id,
      museum: "Art Institute of Chicago Collection",
      classification: data.data.artwork_type_title,
      author: data.data.artist_titles,
      image: image,
      title: data.data.title,
      description: data.data.description,
      technique: technique,
      dimensions: data.data.dimensions,
      date: data.data.date_display,
      // Ajoutez d'autres propriétés selon vos besoins
    };
    return selectedData;
  } catch (error) {
    console.error("Error fetching Chicago artwork data:", error);
    throw error; // Gérer les erreurs
  }
};

const getClevelandArtwork = async (objectID) => {
  // Implémenter la logique pour récupérer les données depuis Cleveland Museum of Art (MongoDB)
  try {
    const data = await Cleveland.findOne({ id: objectID });
    // Récupérer l'auteur
    let author =
      data.creators && data.creators.length > 0
        ? data.creators[0].description
        : "Unknown";
    // Créer un nouvel objet avec les éléments sélectionnés
    const selectedData = {
      objectID: data.id,
      museum: "The Cleveland Museum of Art",
      classification: data.type,
      author: author,
      image: data.images.web.url,
      title: data.title,
      description: data.did_you_know,
      technique: data.technique,
      dimensions: data.measurements,
      date: data.creation_date,
      // Ajoutez d'autres propriétés selon vos besoins
    };
    return selectedData; // Retourne l'objet trouvé dans la base de données MongoDB
  } catch (error) {
    console.error("Error fetching Cleveland artwork data:", error);
    throw error; // Gérer les erreurs
  }
};

const getMETArtwork = async (objectID) => {
  // Implémenter la logique pour récupérer les données depuis MET Museum (MongoDB)
  try {
    const data = await Met.findOne({ objectID });
    console.log("data met is", data);

    // Créer un nouvel objet avec les éléments sélectionnés
    const selectedData = {
      objectID: data.objectID,
      museum: "MET Museum",
      classification: data.objectName,
      author: data.artistDisplayName,
      image: data.primaryImageSmall,
      title: data.title,
      technique: data.medium,
      dimensions: data.dimensions,
      date: data.objectDate,
      // Ajoutez d'autres propriétés selon vos besoins
    };
    console.log("selected data is", selectedData);
    return selectedData; // Retourne l'objet trouvé dans la base de données MongoDB
  } catch (error) {
    console.error("Error fetching MET artwork data:", error);
    throw error; // Gérer les erreurs
  }
};

module.exports = {
  getHarvardArtwork,
  getChicagoArtwork,
  getClevelandArtwork,
  getMETArtwork,
};
