// const db = require("./Db");


// const bcrypt = require("bcrypt");

// async function initDb() {
//   try {
//     //  EVENTS TABLE
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS events (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         price_per_head DECIMAL(10,2) NOT NULL,
//         description TEXT NOT NULL
//       )
//     `);

//     //  MEMBERS TABLE (UPDATED)
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS members (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) ,
//         role VARCHAR(255) ,
//         phone VARCHAR(20) ,
//         image VARCHAR(255),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     //  OTHER TABLES
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS otp_codes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         email VARCHAR(255) NOT NULL,
//         email_otp VARCHAR(10) NOT NULL,
//         expires_at DATETIME NOT NULL
//       )
//     `);

//     await db.query(`
//       CREATE TABLE IF NOT EXISTS bookings (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         event_id INT NOT NULL,
//         customer_name VARCHAR(255) NOT NULL,
//         contact VARCHAR(20) NOT NULL,
//         event_date DATE NOT NULL,
//         guests INT NOT NULL,
//         SetNotes TEXT,
//         user_email VARCHAR(255) NOT NULL,
//         FOREIGN KEY (event_id) REFERENCES events(id)
//         ON DELETE CASCADE
// ON UPDATE CASCADE
//       )

//     `);

//     await db.query(`
//       CREATE TABLE IF NOT EXISTS ratings (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         rating INT NOT NULL,
//         comments TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     await db.query(`
//       CREATE TABLE IF NOT EXISTS super_admin (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL
//       )
//     `);

//     // ✅ SECURE ADMIN
//     // const [admins] = await db.query("SELECT * FROM super_admin LIMIT 1");
//     // const [admins] = await db.query("SELECT id FROM super_admin LIMIT 1");

//     // if (admins.length === 0) {
//     //   const hashedPassword = await bcrypt.hash("S3cure@Admin#2026!", 10);

//     //   await db.query(
//     //     "INSERT INTO super_admin (name, password) VALUES (?, ?)",
//     //     ["root_master_01", hashedPassword]
//     //   );

//     //   console.log("✅ Secure admin created");
//     // }

//   const [admins] = await db.query("SELECT id FROM super_admin LIMIT 1");

// const newName = "root_master_01";   // new admin name
// const newPassword = "S3cure@Admin#2026!"; // new password (plain text)

// if (admins.length === 0) {
//   // No admin exists → insert new
//   await db.query(
//     "INSERT INTO super_admin (name, password) VALUES (?, ?)",
//     [newName, newPassword]
//   );
//   console.log(" Secure admin created (plain text)");
// } else {
//   // Admin exists → update existing
//   await db.query(
//     "UPDATE super_admin SET name = ?, password = ? WHERE id = ?",
//     [newName, newPassword, admins[0].id]
//   );
//   console.log(" Admin name and password updated (plain text)");
// }

// await db.query(`
//   INSERT IGNORE INTO events (id, name, price_per_head, description) 
//   VALUES 
//   (1, 'Wedding', 10, 'Full catering service'),
//   (2, 'Birthday', 7, 'Basic party catering'),
//   (3, 'Anniversary',10, 'Special event catering'),
//   (4, 'Others', 10, 'Custom events')
// `);

// const [rows] = await db.query("SELECT COUNT(*) as count FROM members");
// if (rows[0].count === 0) {
//   const [result] = await db.query(`
// INSERT INTO members 
// (name, role, phone, created_at, image) 
// VALUES 
// ('Bapan Ghosh','Manager','276567528769','2026-03-19 03:04:30','/images/Pic.jpg'),
// ('Madhab Ghosh','Manager','123455677','2026-03-19 16:07:27','/images/Pic.jpg'),
// ('Rajib Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Victor Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Pintu Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Ashutosh Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Hitu Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Biswajit Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Bikramjit Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Kuntol Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Somnath Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Debdut Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Karna Ghosh','Helper','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Ujjal Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
// ('Kartik Ghosh','Waiter',NULL,'2026-03-22 04:02:38','/images/Pic.jpg')
// `);
  
// console.log("Inserted members:", result);
//   }
//     else {
//     console.log("⚠️ Members already exist");
//   }

//   }  catch (error) {
//     console.error("❌ DB Init Error:", error);
//   }
// }
// module.exports = initDb;

const db = require("./Db");
const path = require("path");

async function initDb() {
  try {
    // ✅ EVENTS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price_per_head DECIMAL(10,2) NOT NULL,
        description TEXT NOT NULL
      )
    `);

    // ✅ MEMBERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        role VARCHAR(255),
        phone VARCHAR(20),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ✅ OTHER TABLES
    await db.query(`
      CREATE TABLE IF NOT EXISTS otp_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        email_otp VARCHAR(10) NOT NULL,
        expires_at DATETIME NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        contact VARCHAR(20) NOT NULL,
        event_date DATE NOT NULL,
        guests INT NOT NULL,
        SetNotes TEXT,
        user_email VARCHAR(255) NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rating INT NOT NULL,
        comments TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS super_admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    // ✅ INSERT/UPDATE ADMIN (PLAIN TEXT)
    const [admins] = await db.query("SELECT id FROM super_admin LIMIT 1");
    const newName = "root_master_01";
    const newPassword = "S3cure@Admin#2026!";

    if (admins.length === 0) {
      await db.query(
        "INSERT INTO super_admin (name, password) VALUES (?, ?)",
        [newName, newPassword]
      );
      console.log("✅ Secure admin created (plain text)");
    } else {
      await db.query(
        "UPDATE super_admin SET name = ?, password = ? WHERE id = ?",
        [newName, newPassword, admins[0].id]
      );
      console.log("✅ Admin name and password updated (plain text)");
    }

    // ✅ INSERT EVENTS (IGNORE IF EXISTS)
    await db.query(`
      INSERT IGNORE INTO events (id, name, price_per_head, description) 
      VALUES 
      (1, 'Wedding', 10, 'Full catering service'),
      (2, 'Birthday', 7, 'Basic party catering'),
      (3, 'Anniversary',10, 'Special event catering'),
      (4, 'Others', 10, 'Custom events')
    `);

    // ✅ FORCE INSERT MEMBERS IF NONE EXIST
    const [rows] = await db.query("SELECT COUNT(*) as count FROM members");
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO members (name, role, phone, created_at, image) VALUES
        ('Bapan Ghosh','Manager','276567528769','2026-03-19 03:04:30','/images/Pic.jpg'),
        ('Madhab Ghosh','Manager','123455677','2026-03-19 16:07:27','/images/Pic.jpg'),
        ('Rajib Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Victor Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Pintu Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Ashutosh Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Hitu Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Biswajit Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Bikramjit Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Kuntol Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Somnath Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Debdut Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Karna Ghosh','Helper','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Ujjal Ghosh','Waiter','123455677','2026-03-19 16:13:05','/images/Pic.jpg'),
        ('Kartik Ghosh','Waiter',NULL,'2026-03-22 04:02:38','/images/Pic.jpg')
      `);
      console.log("✅ Members inserted");
    } else {
      console.log("⚠️ Members already exist");
    }

  } catch (error) {
    console.error("❌ DB Init Error:", error);
  }
}

module.exports = initDb;