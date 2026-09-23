const bcrypt = require("bcryptjs");
const db = require("../config/database");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "username, email, password required." });
    }
    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, email, password, full_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, full_name, is_active, created_at`,
      [username, email, hashed, full_name || null],
    );
    return res.status(201).json({ success: true, message: "User created.", data: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ success: false, message: "Username or email exists." });
    }
    return res.status(500).json({ success: false, message: "Server error.", error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT id, username, email, full_name, is_active, created_at FROM users ORDER BY id");
    return res.status(200).json({ success: true, total: result.rows.length, data: result.rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error.", error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await db.query("SELECT id, username, email, full_name, is_active, created_at FROM users WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error.", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, full_name, is_active } = req.body;
    const existing = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    let hashed = existing.rows[0].password;
    if (password) hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      `UPDATE users SET
         username = COALESCE($1, username),
         email = COALESCE($2, email),
         password = $3,
         full_name = COALESCE($4, full_name),
         is_active = COALESCE($5, is_active),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, username, email, full_name, is_active, updated_at`,
      [username || null, email || null, hashed, full_name || null, is_active, id],
    );
    return res.status(200).json({ success: true, message: "User updated.", data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error.", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING id, username", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, message: "User deleted.", data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error.", error: err.message });
  }
};
