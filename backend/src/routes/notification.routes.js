const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { query } = require('../config/database');

// GET /api/notifications — list notifications for current user
router.get('/', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await query(
      `SELECT id, type, title, message, is_read, related_auction_id, link, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 100`,
      [userId]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});

// GET /api/notifications/unread-count
router.get('/unread-count', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false',
      [userId]
    );
    res.json({ success: true, count: parseInt(result.rows[0].count) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get unread count' });
  }
});

// PUT /api/notifications/read-all — mark all as read
router.put('/read-all', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    await query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false',
      [userId]
    );
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark all as read' });
  }
});

// PUT /api/notifications/:id/read — mark single notification as read
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await query(
      'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark as read' });
  }
});

// DELETE /api/notifications/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const result = await query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete notification' });
  }
});

module.exports = router;
