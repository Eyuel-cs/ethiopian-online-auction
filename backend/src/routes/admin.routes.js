const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const {
  getAllUsers,
  getAllAuctions,
  getDisputes,
  resolveDispute,
  getReports,
  reviewReport,
  getTransactions,
  releaseEscrow,
  getSellerApplications,
  approveSellerApplication,
  rejectSellerApplication,
  getActivityLog,
  getEnhancedStatistics,
  changeUserRole,
  toggleBlockUser,
  toggleVerifyUser,
  addUser,
  updateThresholds,
  changeAdminPassword,
  deleteUser,
  updateSettings,
  updateReport,
} = require('../controllers/admin.controller');

// All admin routes require authentication and admin role
router.use(verifyToken);
router.use(isAdmin);

// Users & Auctions
router.get('/users', getAllUsers);
router.post('/users', addUser);                          // add new user
router.delete('/users/:userId', deleteUser);             // delete user
router.get('/auctions', getAllAuctions);
router.put('/users/:userId/role', changeUserRole);       // change role manually
router.put('/users/:userId/block', toggleBlockUser);     // block / unblock
router.put('/users/:userId/verify', toggleVerifyUser);   // verify / unverify

// Disputes
router.get('/disputes', getDisputes);
router.put('/disputes/:disputeId/resolve', resolveDispute);

// Reports
router.get('/reports', getReports);
router.put('/reports/:reportId', updateReport);          // update report status (direct)
router.put('/reports/:reportId/review', reviewReport);   // review with admin notes

// Transactions & Escrow
router.get('/transactions', getTransactions);
router.post('/transactions/:transactionId/release-escrow', releaseEscrow);

// Seller Applications
router.get('/seller-applications', getSellerApplications);
router.put('/seller-applications/:sellerId/approve', approveSellerApplication);
router.put('/seller-applications/:sellerId/reject', rejectSellerApplication);

// Activity Log
router.get('/activity', getActivityLog);

// Statistics
router.get('/statistics/enhanced', getEnhancedStatistics);

// Settings
router.put('/settings', updateSettings);                 // save platform settings
router.get('/settings/thresholds', updateThresholds);   // get ML thresholds
router.put('/settings/thresholds', updateThresholds);   // update ML thresholds
router.put('/settings/password', changeAdminPassword);  // change admin password

module.exports = router;
