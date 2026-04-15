const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { bidLimiter } = require('../middleware/security.middleware');
const {
  placeBid,
  enableAutoBid,
  getMyBids
} = require('../controllers/bid.controller');

router.post('/place', verifyToken, bidLimiter, placeBid);
router.post('/auto-bid', verifyToken, bidLimiter, enableAutoBid);
router.get('/my-bids', verifyToken, getMyBids);

module.exports = router;
