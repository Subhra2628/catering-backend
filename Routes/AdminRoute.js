


// const express = require("express");
// const router = express.Router();
// const db = require("../Config/Db");
// const verifyAdmin = require("../Middleware/admin");


// router.get("/bookings", verifyAdmin, async (req, res) => {
//     console.log("BOOKINGS API HIT");
//   try {
//     const [results] = await db.query("SELECT * FROM bookings ORDER BY id DESC");
//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ message: "DB error" });
//   }
// });

// // GET: ratings
// router.get("/ratings", verifyAdmin, async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM ratings ORDER BY id DESC");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: "DB error" });
//   }
// });

// // DELETE: bookings/:id
// router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
//   try {
//     const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [req.params.id]);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// // DELETE: ratings/:id
// router.delete("/ratings/:id", verifyAdmin, async (req, res) => {
//   try {
//     await db.query("DELETE FROM ratings WHERE id = ?", [req.params.id]);
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });
// router.put("/events/:id", verifyAdmin, async (req, res) => {
//   console.log("🔥 UPDATE EVENT HIT");

//   const { name, price_per_head, description } = req.body;

//   try {
//     const [result] = await db.query(
//       "UPDATE events SET name=?, price_per_head=?, description=? WHERE id=?",
//       [name, price_per_head, description, req.params.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json({ message: "Event updated successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Update failed" });
//   }
// });
// module.exports = router;

console.log("🔥 ADMIN ROUTES LOADED");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../Config/Db");
const verifyAdmin = require("../Middleware/admin");

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM super_admin WHERE name = ? AND password = ?",
      [name, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];

    const token = jwt.sign(
      { id: admin.id, name: admin.name, role: "admin" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "2h" }
    );

    res.json({ token, name: admin.name });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET BOOKINGS
router.get("/bookings", verifyAdmin, async (req, res) => {
  const [results] = await db.query("SELECT * FROM bookings ORDER BY id DESC");
  res.json(results);
});

// ✅ GET RATINGS
router.get("/ratings", verifyAdmin, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM ratings ORDER BY id DESC");
  res.json(rows);
});

// ✅ DELETE BOOKING
router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
  await db.query("DELETE FROM bookings WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

// ✅ DELETE RATING
router.delete("/ratings/:id", verifyAdmin, async (req, res) => {
  await db.query("DELETE FROM ratings WHERE id=?", [req.params.id]);
  res.json({ message: "Deleted" });
});

// ✅ UPDATE EVENT
router.put("/events/:id", verifyAdmin, async (req, res) => {
  console.log("🔥 UPDATE EVENT HIT");

  const { name, price_per_head, description } = req.body;

  const [result] = await db.query(
    "UPDATE events SET name=?, price_per_head=?, description=? WHERE id=?",
    [name, price_per_head, description, req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ message: "Event updated successfully" });
});

// ✅ DELETE EVENT
router.delete("/events/:id", verifyAdmin, async (req, res) => {
  console.log("🔥 DELETE EVENT HIT");

  const [result] = await db.query(
    "DELETE FROM events WHERE id=?",
    [req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json({ message: "Event deleted successfully" });
});

// ✅ ADD EVENT
router.post("/events", verifyAdmin, async (req, res) => {
  console.log("🔥 ADD EVENT HIT");

  const { name, price_per_head, description } = req.body;

  // basic validation
  if (!name || !price_per_head) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO events (name, price_per_head, description) VALUES (?, ?, ?)",
      [name, price_per_head, description]
    );

    res.json({
      message: "Event created successfully",
      id: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Insert failed" });
  }
});
module.exports = router;