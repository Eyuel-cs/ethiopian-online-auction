-- Add missing columns to reports table if they don't exist
ALTER TABLE reports ADD COLUMN IF NOT EXISTS admin_action VARCHAR(50);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS reviewed_by_admin_id UUID REFERENCES users(id);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP;

SELECT 'Reports table columns fixed!' as status;
