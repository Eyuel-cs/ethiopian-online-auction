const { query } = require('../config/database');

/**
 * Create a notification for a user
 * @param {string} userId - recipient user ID
 * @param {string} type - notification type (bid, outbid, win, payment, system, etc.)
 * @param {string} title - short title
 * @param {string} message - full message
 * @param {string|null} relatedAuctionId - optional auction UUID
 * @param {string|null} link - optional frontend link
 */
async function createNotification(userId, type, title, message, relatedAuctionId = null, link = null) {
  try {
    await query(
      `INSERT INTO notifications (user_id, type, title, message, related_auction_id, link)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, type, title, message, relatedAuctionId, link]
    );
  } catch (error) {
    // Never crash the main flow due to notification failure
    console.error('Failed to create notification:', error.message);
  }
}

/**
 * Notify all admins
 */
async function notifyAdmins(type, title, message) {
  try {
    const admins = await query(`SELECT id FROM users WHERE role = 'admin'`);
    for (const admin of admins.rows) {
      await createNotification(admin.id, type, title, message);
    }
  } catch (error) {
    console.error('Failed to notify admins:', error.message);
  }
}

module.exports = { createNotification, notifyAdmins };
