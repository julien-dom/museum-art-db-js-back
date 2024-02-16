const express = require('express');
const router = express.Router();
const { getHarvardArtwork, getChicagoArtwork, getClevelandArtwork, getMETArtwork } = require('../handlers/artworkDataHandlers');

router.get('/:museum/:objectID', async (req, res) => {
    const { museum, objectID } = req.params;
    let artworkData;

    switch (museum) {
        case 'Harvard Museums Collection':
            artworkData = await getHarvardArtwork(objectID);
            break;
        case 'Art Institute of Chicago Collection':
            artworkData = await getChicagoArtwork(objectID);
            break;
        case 'The Cleveland Museum of Art':
            artworkData = await getClevelandArtwork(objectID);
            break;
        case 'MET Museum':
            artworkData = await getMETArtwork(objectID);
            break;
        default:
            return res.status(404).json({ message: 'Museum not found' });
    }

    res.json(artworkData);
});

module.exports = router;