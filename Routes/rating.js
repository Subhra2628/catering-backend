const express = require("express");
const router = express.Router();
const db = require("../Config/Db");
console.log("API HIT");
//  GET average rating
router.get("/average", async (req, res) => {
  
  try {
    const [rows] = await db.query(
      "SELECT AVG(rating) AS avg_rating, COUNT(*) AS total_votes FROM ratings"
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "DB error", err });
  }
});

// POST new rating
router.post("/", async (req, res) => {
  
  try {
     console.log("BODY:", req.body);
    const { rating,comments } = req.body;

    if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
      return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }

    if (!comments || comments.trim() === "") {
      return res.status(400).json({ message: "Comment is required" });
    }
    await db.query("INSERT INTO ratings (rating,comments) VALUES (?,?)", [rating,comments]);

    res.json({ message: "Rating saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "DB error", err });
    
  }
});

//  GET latest rating
router.get("/latest", async (req, res) => {

  try {
    const [rows] = await db.query(
      "SELECT rating FROM ratings ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No ratings found" });
    }

    res.json({ rating: rows[0].rating });
  } catch (err) {
    res.status(500).json({ message: "DB error", err });
  }
});

module.exports = router;