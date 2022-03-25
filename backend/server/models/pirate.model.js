const mongoose = require("mongoose");

const minLength = 3;

const PirateSchema = new mongoose.Schema({
  pirateName: {
    type: String,
    required: [true, "pirateName is required"],
    minLength: [minLength, `pirateName must be at least ${minLength} characters`],
  },
  imageUrl: {
    type: String,
    required: [true, "Name is required"],
    minLength: [minLength, `Name must be at least ${minLength} characters`],
  },
  numChests: {
    type: Number,
    required: [true, "numChests is required"],
    minLength: [minLength, `numChests must be at least ${minLength} characters`],
  },
  catchPhrase: {
    type: String,
    required: [true, "catchPhrase is required"],
    minLength: [minLength, `catchPhrase must be at least ${minLength} characters`],
  },
  crewPosition: {
    type: String,
    required: [true, "crewPosition is required"],
    minLength: [minLength, `crewPosition must be at least ${minLength} characters`],
  },
  pegLeg: {
    type: String,
    required: [true, "pegLeg is required"],
    minLength: [minLength, `pegLeg must be at least ${minLength} characters`],
  },
  eyePatch: {
    type: String,
    required: [true, "eyePatch is required"],
    minLength: [minLength, `eyePatch must be at least ${minLength} characters`],
  },
  hookHand: {
    type: String,
    required: [true, "hookHand is required"],
    minLength: [minLength, `hookHand must be at least ${minLength} characters`],
  },

}, { timestamps: true });

const Pirate = mongoose.model("Pirate", PirateSchema);

module.exports = Pirate;

// ${minLength}