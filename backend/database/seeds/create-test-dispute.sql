-- Create a test dispute using real auction/user data from your DB
-- Run this in pgAdmin to seed a dispute for testing

INSERT INTO disputes (auction_id, buyer_id, seller_id, reason, description, status)
SELECT 
  a.id as auction_id,
  b.bidder_id as buyer_id,
  a.seller_id,
  'fake_auction',
  'This item was not as described in the listing.',
  'pending'
FROM auctions a
JOIN bids b ON b.auction_id = a.id
WHERE a.status IN ('active', 'ended')
LIMIT 1;

SELECT 'Test dispute created!' as status;
SELECT id, status, reason, description FROM disputes ORDER BY created_at DESC LIMIT 3;
