const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// ─── 1. HTTP Security Headers (Helmet) ───────────────────────────────────────
// Sets X-Content-Type-Options, X-Frame-Options, HSTS, CSP, etc.
const helmetMiddleware = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images from frontend
  contentSecurityPolicy: false, // disable CSP for API-only server
});

// ─── 2. Global Rate Limiter ───────────────────────────────────────────────────
// Disabled in development, active in production
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 100 : 0,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  skip: (req) => process.env.NODE_ENV !== 'production' || req.path === '/health',
});

// ─── 3. Auth Rate Limiter ─────────────────────────────────────────────────────
// Disabled in development to prevent blocking during testing
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 10 : 0,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please wait 15 minutes.' },
  skip: () => process.env.NODE_ENV !== 'production',
});

// ─── 4. Bid Rate Limiter ──────────────────────────────────────────────────────
// Disabled in development
const bidLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 30 : 0,
  message: { success: false, message: 'Too many bids placed. Please slow down.' },
  skip: () => process.env.NODE_ENV !== 'production',
});

// ─── 5. HTTP Parameter Pollution Protection ───────────────────────────────────
// Prevents attacks like ?status=active&status=admin
const hppMiddleware = hpp({
  whitelist: ['category', 'status', 'sortBy'], // allow arrays for these filter params
});

// ─── 6. Input Sanitization ───────────────────────────────────────────────────
// Strips dangerous characters from req.body, req.params, req.query
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        // Remove null bytes and trim
        obj[key] = obj[key].replace(/\0/g, '').trim();
        // Block obvious script injection in non-HTML fields
        if (key !== 'description' && key !== 'message' && key !== 'notes') {
          obj[key] = obj[key].replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        }
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]);
      }
    }
    return obj;
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
};

// ─── 7. Security Response Headers ────────────────────────────────────────────
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Powered-By', 'Auction Platform'); // hide Express
  res.setHeader('X-Request-ID', `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  next();
};

module.exports = {
  helmetMiddleware,
  globalLimiter,
  authLimiter,
  bidLimiter,
  hppMiddleware,
  sanitizeInput,
  securityHeaders,
};
