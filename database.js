// const mongoose = require("mongoose");
import mongoose from "mongoose"; 


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};


// Characters Schema
const CharacterSchema = new mongoose.Schema({
  gameKey: String,  // Links players to a game
  name: String,
  role: { type: String, enum: ["Civilian", "Medic", "Mafia"], required: true },
  isAlive: { type: Boolean, default: true },
  votes: {type: Number, default: 0},
});

const Character = mongoose.model("Character", CharacterSchema);


// Scores Schema
const ScoreSchema = new mongoose.Schema({
  gameKey: String,  // Links scores to a game
  playerName: String,
  score: { type: Number, default: 0 },
  roundsSurvived: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
});

const Score = mongoose.model("Score", ScoreSchema);


// Games Schema
const GameSchema = new mongoose.Schema({
  gameKey: { type: String, unique: true, required: true },
  hostName: String,
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", GameSchema);


// module.exports = { connectDB, Player, Score, Game };
export { connectDB, Character, Score, Game };
