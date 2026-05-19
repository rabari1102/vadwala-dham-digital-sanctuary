const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'vadwala_dham_change_this_in_production';

/**
 * Generate a signed JWT token with expiry
 */
function generateToken(admin) {
  return jwt.sign(
    { id: admin._id, role: admin.role, email: admin.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify JWT token from Authorization header
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Middleware: require valid JWT for protected routes
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.replace('Bearer ', '');
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.admin = payload;
  next();
}

/**
 * Middleware: require superadmin role
 */
function requireSuperAdmin(req, res, next) {
  if (req.admin && req.admin.role === 'superadmin') {
    return next();
  }
  return res.status(403).json({ error: 'Superadmin access required' });
}

module.exports = { generateToken, verifyToken, requireAuth, requireSuperAdmin, JWT_SECRET };
