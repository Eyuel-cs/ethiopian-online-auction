# Online Auction Platform - Backend API

## Technology Stack
- **Node.js** with **Express.js**
- **PostgreSQL** (Database)
- **Redis** (Caching & Real-time)
- **Socket.io** (WebSocket for real-time bidding)
- **JWT** (Authentication)
- **Blockchain** (Escrow smart contracts)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
Make sure PostgreSQL is installed and running on your machine.

Create the database:
```bash
psql -U postgres
CREATE DATABASE auction_platform;
\q
```

Run the database schema:
```bash
psql -U postgres -d auction_platform -f database-schema.sql
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
cp .env.example .env
```

Update the following in `.env`:
- `DB_PASSWORD`: Your PostgreSQL password
- `JWT_SECRET`: A strong secret key
- Other API keys as needed

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (requires auth)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)
- `GET /api/users/wallet` - Get wallet balance (requires auth)
- `POST /api/users/wallet/add-funds` - Add funds to wallet (requires auth)

### Auctions
- `GET /api/auctions` - List all auctions
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions` - Create auction (seller only)
- `PUT /api/auctions/:id` - Update auction (seller only)
- `DELETE /api/auctions/:id` - Delete auction (seller only)

### Bids
- `POST /api/bids/place` - Place a bid (requires auth)
- `POST /api/bids/auto-bid` - Enable auto-bid (requires auth)
- `GET /api/bids/my-bids` - Get user's bids (requires auth)

### Escrow
- `POST /api/escrow/create` - Create escrow transaction (requires auth)
- `POST /api/escrow/:id/provide-shipping-id` - Provide shipping ID (requires auth)
- `POST /api/escrow/:id/dispute` - Open dispute (requires auth)
- `GET /api/escrow/my-transactions` - Get user's escrow transactions (requires auth)

### Admin
- `GET /api/admin/dashboard/stats` - Dashboard statistics (admin only)
- `GET /api/admin/users` - List all users (admin only)
- `PUT /api/admin/users/:id/verify` - Verify user (admin only)
- `PUT /api/admin/users/:id/blacklist` - Blacklist user (admin only)
- `GET /api/admin/escrow/transactions` - List escrow transactions (admin only)
- `POST /api/admin/escrow/:id/verify-shipping` - Verify shipping (admin only)
- `POST /api/admin/escrow/:id/release-funds` - Release funds (admin only)
- `GET /api/admin/disputes` - List disputes (admin only)
- `PUT /api/admin/disputes/:id/resolve` - Resolve dispute (admin only)

### Payments
- `POST /api/payments/telebirr/initiate` - Initiate Telebirr payment
- `POST /api/payments/chapa/initiate` - Initiate Chapa payment
- `POST /api/payments/cbe/initiate` - Initiate CBE payment

### Notifications
- `GET /api/notifications` - Get user notifications (requires auth)
- `PUT /api/notifications/:id/read` - Mark as read (requires auth)
- `PUT /api/notifications/read-all` - Mark all as read (requires auth)

## WebSocket Events

### Client → Server
- `auction:watch` - Start watching an auction
- `auction:unwatch` - Stop watching an auction

### Server → Client
- `bid:new` - New bid placed (broadcast to all watching)
- `bid:outbid` - User was outbid
- `auction:ending-soon` - Auction ending soon
- `auction:ended` - Auction ended

## Database Schema
See `database-schema.sql` for the complete database structure.

## Project Structure
```
backend/
├── src/
│   ├── config/          # Database & Redis configuration
│   ├── controllers/     # Route handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation middleware
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── validators/      # Input validation
│   └── server.js        # Main server file
├── database-schema.sql  # PostgreSQL schema
├── .env                 # Environment variables
├── .env.example         # Example environment variables
└── package.json         # Dependencies
```

## Next Steps
1. ✅ Basic authentication (register, login, OTP)
2. ⏳ Implement auction CRUD operations
3. ⏳ Implement real-time bidding with WebSocket
4. ⏳ Implement blockchain escrow integration
5. ⏳ Implement payment gateway integrations
6. ⏳ Implement admin features
7. ⏳ Implement fraud detection AI
8. ⏳ Add comprehensive testing

## Testing
Use tools like Postman or Thunder Client to test the API endpoints.

Health check endpoint:
```
GET http://localhost:5000/health
```

## Support
For issues or questions, please contact the development team.
