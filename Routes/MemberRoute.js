const express = require("express");
const router = express.Router();
const db = require("../Config/Db");

// GET all members
router.get("/", async(req, res) => {
  try{
    const [members] = await db.query("SELECT * FROM members");
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching members" });
  }
});

// ADD member
router.post("/",async (req, res) => {
  const { name, role, phone } = req.body;

 try {
    const sql = "INSERT INTO members (name, role, phone) VALUES (?, ?, ?)";
    await db.query(sql, [name, role, phone]);
    res.json({ message: "Member added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding member" });
  }
});

module.exports = router;