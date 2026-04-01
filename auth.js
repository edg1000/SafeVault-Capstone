const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUser } = require('./userController');

async function registerUser(username, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  // Save user with hashedPassword + role in DB
}

async function loginUser(username, password) {
  const user = await getUser(username);
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Authentication failed");
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).send("No token provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== requiredRole) return res.status(403).send("Access denied");
    next();
  };
}

module.exports = { registerUser, loginUser, authorizeRole };

