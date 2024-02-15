const express = require("express");
const router = express.Router();
const Met = require("../models/metdatas");

// Route pour obtenir la liste des données Met (trop de données pour memoire)
router.get("/", async (req, res) => {
  try {
    // Récupérer toutes les données Met de la base de données
    const metdatas = await Met.find();

    // Renvoyer la réponse avec le nombre de données récupérées
    res.json({ success: true, count: metdatas.length, data: metdatas });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse d'erreur
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des données Met." });
  }
});

// Route pour la recherche basée sur un mot-clé avec images
router.get("/search", async (req, res) => {
  try {
    // Récupérer le mot-clé de la requête
    const searchKeyword = req.query.keyword;

    // Rechercher les données correspondant au mot-clé dans la base de données
    const metDatasWithImage = await Met.find({
      // Utiliser une expression régulière pour une recherche insensible à la casse dans le titre
      title: { $regex: new RegExp(searchKeyword, "i") },
      // Vérifier si l'URL de l'image existe et n'est pas null
      primaryImageSmall: { $exists: true, $ne: null }
    });

    // Si aucune donnée n'est trouvée, renvoyer une réponse appropriée
    if (metDatasWithImage.length === 0) {
      return res.json({ success: false, message: "Aucune donnée avec des images valides trouvée pour le mot-clé donné." });
    }

    // Si des données sont trouvées, renvoyer les données dans la réponse
    res.json({ success: true, count: metDatasWithImage.length, data: metDatasWithImage });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse d'erreur
    res.status(500).json({ success: false, error: "Une erreur s'est produite lors de la recherche de données avec des images." });
  }
});

// Route pour supprimer les documents Met sans image
router.delete("/no-image", async (req, res) => {
  try {
    // Rechercher et supprimer les documents Met sans image dans la base de données
    const deletedMetWithoutImage = await Met.deleteMany({ $or: [{ primaryImage: { $exists: false } }, { primaryImage: "" }] });

    // Vérifier si des documents ont été trouvés et supprimés avec succès
    if (deletedMetWithoutImage.deletedCount === 0) {
      return res.json({ success: true, message: "Aucun document Met sans image trouvé." });
    }

    // Si des documents ont été supprimés avec succès, renvoyer une réponse de succès
    res.json({
      success: true,
      message: `${deletedMetWithoutImage.deletedCount} documents Met sans image supprimés avec succès.`,
    });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse d'erreur
    res.status(500).json({ success: false, error: "Une erreur s'est produite lors de la suppression des documents Met sans image." });
  }
});

module.exports = router;
