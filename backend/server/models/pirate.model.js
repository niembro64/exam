const mongoose = require("mongoose");

const minLength = 3;
const minNum = 0;
const maxNum = 10;
const defaultBool = true;

const PirateSchema = new mongoose.Schema(
  {
    pirateName: {
      type: String,
      required: [true, "pirateName is required"],
      minLength: [
        minLength,
        `pirateName must be at least ${minLength} characters`,
      ],
    },
    imageUrl: {
      type: String,
      required: [true, "imageUrl is required"],
      minLength: [
        minLength,
        `imageUrl must be at least ${minLength} characters`,
      ],
    },
    numChests: {
      type: Number,
      required: [true, "numChests is required"],
      min: [minNum, `numChests must be at least ${minNum}`],
    },
    catchPhrase: {
      type: String,
      required: [true, "catchPhrase is required"],
      minLength: [
        minLength,
        `catchPhrase must be at least ${minLength} characters`,
      ],
    },
    crewPosition: {
      type: String,
      required: [true, "crewPosition is required"],
      minLength: [
        minLength,
        `crewPosition must be at least ${minLength} characters`,
      ],
    },
    pegLeg: {
      type: Boolean,
      required: [true, "pegLeg is required"],
      default: defaultBool,
    },
    eyePatch: {
      type: String,
      required: [true, "eyePatch is required"],
      default: defaultBool,
    },
    hookHand: {
      type: String,
      required: [true, "hookHand is required"],
      default: defaultBool,
    },
  },
  { timestamps: true }
);

const Pirate = mongoose.model("Pirate", PirateSchema);

module.exports = Pirate;

// ${minLength}
