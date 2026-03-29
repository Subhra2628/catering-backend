const express = require("express");
const router = express.Router();
const db = require("../Config/Db");

// GET events
router.get("/", async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM events");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching events" });
  }
});


// POST event
router.post("/", async (req, res) => {
  const { name, price_per_head, description } = req.body;

  if (!name || !price_per_head || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const sql = "INSERT INTO events (name, price_per_head, description) VALUES (?, ?, ?)";
    await db.query(sql, [name, price_per_head, description]);
    res.json({ message: "Event added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding event" });
  }
});


module.exports = router;