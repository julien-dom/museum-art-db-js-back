var express = require("express");
var router = express.Router();
const Cleveland = require("../models/clevelanddatas");

// GET cleveland Datas listing. */
router.get("/", async (req, res) => {
  try {
    const clevelanddatas = await Cleveland.find();
    res.json({ result: true, length: clevelanddatas.length });
  } catch (error) {
    res.json({
      result: false,
      error: "An error occurred while retrieving clevelanddatas",
    });
  }
});

// Endpoint GET pour la recherche basée sur un mot-clé avec images
router.get("/search", async (req, res) => {
  // Récupérer le mot-clé de la requête
  const searchKeyword = req.query.keyword;

  try {
    // Rechercher les données correspondant au mot-clé dans la base de données
    const clevelandDatasWithImage = await Cleveland.find({
      // Utiliser une expression régulière pour une recherche insensible à la casse dans le titre
      title: { $regex: new RegExp(searchKeyword, "i") },
      "images.web.url": { $exists: true, $ne: null }, // Vérifier si l'URL de l'image existe et n'est pas null
    });

    // Si aucune donnée n'est trouvée, renvoyer une réponse appropriée
    if (clevelandDatasWithImage.length === 0) {
      return res.json({
        result: false,
        message: "No data with valid images found for the given keyword.",
      });
    }

    // Si des données sont trouvées, renvoyer les données dans la réponse
    res.json({
      result: true,
      length: clevelandDatasWithImage.length,
      data: clevelandDatasWithImage,
    });
  } catch (error) {
    // En cas d'erreur, renvoyer une réponse d'erreur
    res.status(500).json({
      result: false,
      error: "An error occurred while searching for data with images.",
    });
  }
});

module.exports = router;
