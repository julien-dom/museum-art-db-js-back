const mongoose = require("mongoose");

const clevelandSchema = mongoose.Schema({
  id: Number,
  creators: [
    {
      description: String,
      // Autres champs éventuels pour les créateurs
    },
  ],
  title: String,
  images: {
    web: {
      url: String,
    },
  },
  museum: String,
  type: String,
  did_you_know: String,
  technique: String,
  measurements: String,
  creation_date: String

});

const Cleveland = mongoose.model("clevelanddatas", clevelandSchema);

module.exports = Cleveland;
