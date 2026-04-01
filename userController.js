// src/userController.js
const db = require('./db');
const { validateUsername } = require('./inputValidation');

async function getUser(username) {
  if (!validateUsername(username)) {
    throw new Error("Invalid username format");
  }
  const stmt = await db.prepare("SELECT * FROM users WHERE username = ?");
  return await stmt.get(username); // parameterized query prevents SQL injection
}

