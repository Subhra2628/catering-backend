


const express = require("express");
const router = express.Router();
const db = require("../Config/Db");
const verifyAdmin = require("../Middleware/admin");


router.get("/bookings", verifyAdmin, async (req, res) => {
    console.log("BOOKINGS API HIT");
  try {
    const [results] = await db.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "DB error" });
  }
});

// GET: ratings
router.get("/ratings", verifyAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ratings ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "DB error" });
  }
});

// DELETE: bookings/:id
router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// DELETE: ratings/:id
router.delete("/ratings/:id", verifyAdmin, async (req, res) => {
  try {
    await db.query("DELETE FROM ratings WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
module.exports = router;