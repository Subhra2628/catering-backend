const db = require("./Db");

async function initDb() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price_per_head DECIMAL(10,2) NOT NULL,
        description TEXT NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL
      )
    `);

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
        user_email VARCHAR(255) NOT NULL
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

    // Insert default admin if not exists
    const [admins] = await db.query("SELECT * FROM super_admin WHERE name = 'admin'");
    if (admins.length === 0) {
      await db.query("INSERT INTO super_admin (name, password) VALUES ('admin', 'admin123')");
      console.log("Default admin created: name=admin, password=admin123");
    }

    console.log("All tables created successfully");
  } catch (err) {
    console.error("DB init error:", err);
  }
}

module.exports = initDb;
