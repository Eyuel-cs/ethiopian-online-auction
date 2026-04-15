const { query } = require('../config/database');

class AIAssistantService {
  constructor() {
    this.knowledgeBase = {

      // ── BIDDING ──────────────────────────────────────────────────────────────
      bidding: {
        keywords: ['bid', 'bidding', 'place bid', 'how to bid', 'minimum bid', 'increment', 'outbid', 'winning', 'auto bid', 'autobid', 'auto-bid', 'maximum bid'],
        responses: [
          "To place a bid:\n1. Open the auction page\n2. Enter an amount higher than the current bid (minimum +100 ETB)\n3. Click 'Place Bid'\n\nThe amount is immediately deducted from your wallet. If you're outbid, your funds are refunded instantly.",
          "Auto-Bid lets the system bid for you automatically up to a maximum amount you set. It only bids the minimum needed to stay in the lead — so you won't overpay unnecessarily.",
          "If you get outbid, your funds are refunded to your wallet immediately and you'll receive a notification. You can then place a higher bid if you want.",
          "The minimum bid increment is 100 ETB above the current highest bid. You can always bid higher than the minimum.",
          "You cannot bid on your own auction. You also need sufficient wallet balance before placing a bid — top up your wallet first if needed."
        ]
      },

      // ── WALLET & PAYMENTS ────────────────────────────────────────────────────
      wallet: {
        keywords: ['wallet', 'balance', 'add funds', 'deposit', 'top up', 'money', 'payment', 'telebirr', 'chapa', 'cbe', 'birr', 'withdraw', 'refund', 'transaction'],
        responses: [
          "To add funds to your wallet:\n1. Go to Dashboard → Wallet tab\n2. Click 'Add Funds'\n3. Enter the amount\n4. Choose your payment method:\n   • Telebirr (1.5% fee)\n   • Chapa (2.5% fee)\n   • CBE Birr (2% fee)\n\nFunds appear in your wallet within minutes.",
          "Your wallet balance is used for all bidding and purchases. When you place a bid, the amount is locked. If you're outbid, it's refunded instantly. When you win, it moves to escrow.",
          "Accepted payment methods: Telebirr, Chapa, and CBE Birr. All are secure Ethiopian payment gateways.",
          "Refunds are automatic — if you're outbid, your money returns to your wallet immediately. Dispute refunds are processed within 24-48 hours after admin review.",
          "You can view your full transaction history in Dashboard → Wallet tab. It shows all deposits, bids, refunds, and escrow movements."
        ]
      },

      // ── ESCROW ───────────────────────────────────────────────────────────────
      escrow: {
        keywords: ['escrow', 'secure payment', 'funds held', 'release funds', 'payment protection', 'blockchain', 'smart contract'],
        responses: [
          "Escrow is a secure holding system. When you win an auction:\n1. Your payment moves to escrow (not directly to the seller)\n2. The seller ships your item\n3. You receive it and provide the tracking/shipping ID\n4. Admin verifies delivery\n5. Funds are released to the seller\n\nThis protects both buyers and sellers.",
          "The seller only receives payment AFTER you confirm you received the item. This means you're always protected from sellers who don't ship.",
          "To release escrow funds:\n1. Receive your item\n2. Go to the auction page or your dashboard\n3. Enter the shipping/tracking ID\n4. Admin will verify and release funds to the seller within 24 hours.",
          "Our escrow system uses blockchain technology to record every transaction. This creates an immutable audit trail that protects both parties.",
          "If there's a problem with your item, open a dispute BEFORE confirming delivery. Once funds are released, disputes are harder to resolve."
        ]
      },

      // ── WINNING AN AUCTION ───────────────────────────────────────────────────
      winning: {
        keywords: ['won', 'win', 'winner', 'highest bidder', 'auction ended', 'what happens when i win', 'after winning'],
        responses: [
          "Congratulations on winning! Here's what happens next:\n1. You receive a 'You Won!' notification\n2. Your winning bid amount moves to escrow\n3. The seller is notified to ship your item\n4. Once you receive it, confirm delivery to release payment to the seller.",
          "After winning, go to your Dashboard → Portfolio tab to see your won auctions and manage the delivery process.",
          "If you win but don't complete the escrow process within 48 hours, the auction may be re-listed. Make sure to act quickly after winning."
        ]
      },

      // ── SELLER ───────────────────────────────────────────────────────────────
      seller: {
        keywords: ['become seller', 'sell', 'create auction', 'seller account', 'seller application', 'list item', 'selling', 'seller plan', 'commission'],
        responses: [
          "To become a seller:\n1. Go to 'Become a Seller' page\n2. Fill in your business details\n3. Upload required documents (business license, ID, tax certificate)\n4. Submit your application\n5. Wait for admin approval (24-48 hours)\n\nOnce approved, you can create auctions immediately.",
          "Seller subscription plans:\n• Free: 5 auctions/month, 10% commission\n• Premium: Unlimited auctions, 3% commission, featured listings\n• Enterprise: Priority support, advanced analytics, custom commission\n\nYou can upgrade anytime from your dashboard.",
          "To create an auction:\n1. Go to 'Create Auction'\n2. Add title, description, photos\n3. Set starting bid, reserve price (optional), and Buy Now price (optional)\n4. Set start and end dates\n5. Submit — your auction goes live at the scheduled time.",
          "Commission is deducted automatically from the final sale price when escrow is released. Free plan sellers pay 10%, Premium sellers pay 3%.",
          "You can upload up to 10 photos per auction. High-quality photos significantly increase bids. The first photo becomes the main listing image."
        ]
      },

      // ── DISPUTES ─────────────────────────────────────────────────────────────
      dispute: {
        keywords: ['dispute', 'problem', 'issue', 'complaint', 'refund', 'not received', 'damaged', 'wrong item', 'fake', 'fraud', 'scam', 'report'],
        responses: [
          "To open a dispute:\n1. Go to Dashboard → Disputes\n2. Click 'Open Dispute'\n3. Select the auction\n4. Choose the reason (item not received, not as described, damaged, etc.)\n5. Describe the issue in detail\n6. Submit\n\nAn admin will review within 24-48 hours.",
          "Common dispute reasons we handle:\n• Item not received\n• Item not as described\n• Item arrived damaged\n• Wrong item sent\n• Seller not responding\n\nProvide photos and evidence for faster resolution.",
          "Dispute outcomes:\n• Full refund to buyer (if seller at fault)\n• Funds released to seller (if buyer at fault)\n• Partial refund (split decision)\n\nAdmin decisions are final. The process takes 24-48 hours.",
          "Important: Open a dispute BEFORE confirming delivery if you have concerns. Once you confirm delivery and funds are released to the seller, it's much harder to get a refund.",
          "To report a fraudulent user or listing, go to the auction page and click 'Report'. Our team reviews all reports within 24 hours."
        ]
      },

      // ── ACCOUNT & VERIFICATION ───────────────────────────────────────────────
      account: {
        keywords: ['account', 'profile', 'verify', 'verification', 'email', 'password', 'fayda', 'kyc', 'identity', 'register', 'sign up', 'login', 'forgot password'],
        responses: [
          "To verify your account:\n1. Check your email for the 6-digit OTP code\n2. Enter it on the verification page\n3. Your account is now active\n\nVerified accounts can bid and buy. Unverified accounts can only browse.",
          "Fayda verification (Ethiopian National ID) is required for sellers and high-value transactions. It's a one-time process that takes about 2 minutes.",
          "Forgot your password?\n1. Go to Login page\n2. Click 'Forgot Password'\n3. Enter your email\n4. Check your email for a reset code\n5. Enter the code and set a new password",
          "To update your profile: Go to Settings → Edit your name, phone, or profile photo. Email changes require re-verification.",
          "Your account can be suspended if you violate our terms: fake bids, fraudulent listings, or non-payment after winning. Contact support if you believe your suspension is an error."
        ]
      },

      // ── NOTIFICATIONS ────────────────────────────────────────────────────────
      notifications: {
        keywords: ['notification', 'alert', 'email alert', 'sms', 'notify', 'bell', 'unread'],
        responses: [
          "You receive notifications for:\n• New bids on your auctions (sellers)\n• Being outbid (buyers)\n• Winning an auction\n• Escrow updates\n• Dispute status changes\n• Admin messages\n\nCheck the bell icon in the top navbar.",
          "To manage notifications: Go to Settings → Notifications tab. You can enable/disable email and SMS alerts for each event type.",
          "If you're not receiving email notifications, check your spam folder. Add our email to your contacts to ensure delivery."
        ]
      },

      // ── SHIPPING & DELIVERY ──────────────────────────────────────────────────
      shipping: {
        keywords: ['shipping', 'delivery', 'tracking', 'receive item', 'ship', 'courier', 'address', 'location'],
        responses: [
          "After winning and payment is in escrow:\n1. The seller will contact you about shipping\n2. They'll provide a tracking number\n3. Once you receive the item, go to the auction page\n4. Enter the shipping/tracking ID to confirm delivery\n5. This triggers the escrow release to the seller.",
          "Shipping costs are set by the seller when creating the auction. Some sellers offer free shipping — check the auction details before bidding.",
          "If your item hasn't arrived within the expected timeframe, contact the seller first. If no response within 48 hours, open a dispute.",
          "Always inspect your item before confirming delivery. Once you confirm, funds are released to the seller and disputes become harder to resolve."
        ]
      },

      // ── FEES & PRICING ───────────────────────────────────────────────────────
      fees: {
        keywords: ['fee', 'cost', 'charge', 'commission', 'price', 'how much', 'free', 'subscription', 'plan'],
        responses: [
          "Buyer fees: None! You only pay the winning bid amount plus any shipping cost set by the seller.",
          "Seller fees:\n• Free plan: 10% commission on sales, 5 auctions/month\n• Premium plan: 3% commission, unlimited auctions\n• Enterprise: Custom rates, priority support\n\nCommission is deducted automatically from escrow release.",
          "Payment processing fees (charged by the payment provider):\n• Telebirr: 1.5%\n• Chapa: 2.5%\n• CBE Birr: 2%\n\nThese are in addition to the winning bid amount."
        ]
      },

      // ── SECURITY & FRAUD ─────────────────────────────────────────────────────
      security: {
        keywords: ['security', 'safe', 'fraud', 'scam', 'fake', 'shill bidding', 'trust', 'protect', 'secure', 'ml', 'ai detection'],
        responses: [
          "We use ML-powered fraud detection on every bid. Our system analyzes bidding patterns, user history, and behavior to detect shill bidding and fake accounts automatically.",
          "Tips to stay safe:\n• Never share your password or OTP\n• Only pay through the platform wallet — never direct bank transfers\n• Report suspicious listings immediately\n• Check seller ratings and history before bidding",
          "Shill bidding (fake bids to inflate prices) is strictly prohibited and detected by our AI system. Accounts caught shill bidding are permanently banned.",
          "All payments go through our secure escrow system. We never ask for direct bank transfers or mobile money outside the platform."
        ]
      },

      // ── CATEGORIES ───────────────────────────────────────────────────────────
      categories: {
        keywords: ['category', 'electronics', 'vehicles', 'jewelry', 'home', 'art', 'collectibles', 'what can i buy', 'what can i sell'],
        responses: [
          "Available auction categories:\n• Electronics (phones, laptops, TVs)\n• Vehicles (cars, motorcycles, trucks)\n• Jewelry & Watches\n• Home & Garden\n• Art & Collectibles\n• Fashion & Clothing\n• Real Estate\n• Agricultural Equipment\n\nBrowse by category on the Auctions page.",
          "You can sell almost anything legal on our platform. Prohibited items include: weapons, counterfeit goods, stolen property, and items banned by Ethiopian law."
        ]
      },

      // ── CONTACT & SUPPORT ────────────────────────────────────────────────────
      support: {
        keywords: ['contact', 'support', 'help', 'human', 'agent', 'phone', 'email support', 'customer service', 'talk to someone'],
        responses: [
          "Need to reach our support team?\n• Email: contact@ethiopianauction.com\n• Phone: +251 900 000 000\n• Location: Addis Ababa, Ethiopia\n• Hours: Monday–Friday, 8AM–6PM EAT\n\nFor urgent issues, use the dispute system in your dashboard.",
          "For account issues, billing problems, or urgent disputes, email us at contact@ethiopianauction.com with your account email and a description of the issue. We respond within 4 hours during business hours.",
          "I'm an AI assistant and can answer most questions instantly. For complex issues that need human review, please use the dispute system or contact our support team directly."
        ]
      },

      // ── GENERAL ──────────────────────────────────────────────────────────────
      general: {
        keywords: ['help', 'what is', 'how does', 'guide', 'tutorial', 'start', 'new', 'beginner', 'explain', 'overview'],
        responses: [
          "Welcome to AuctionET — Ethiopia's premier online auction platform! 🇪🇹\n\nHere's what you can do:\n• 🔨 Browse and bid on auctions\n• 🏆 Win items at great prices\n• 💼 Sell your items to thousands of buyers\n• 🔒 All payments protected by escrow\n\nWhat would you like to know more about?",
          "Quick start guide:\n1. Register and verify your account\n2. Add funds to your wallet (Telebirr, Chapa, or CBE Birr)\n3. Browse auctions and place bids\n4. Win auctions and confirm delivery\n5. Want to sell? Apply to become a seller!\n\nAsk me anything specific!",
          "I can help you with: bidding, wallet & payments, escrow, becoming a seller, disputes, account verification, shipping, fees, and security. What do you need help with?"
        ]
      }
    };
  }

  async processMessage(userId, message) {
    try {
      const lowerMessage = message.toLowerCase();

      // Find best matching category
      let bestMatch = null;
      let highestScore = 0;

      for (const [category, data] of Object.entries(this.knowledgeBase)) {
        const score = this.calculateMatchScore(lowerMessage, data.keywords);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = { category, data };
        }
      }

      let response;
      if (bestMatch && highestScore > 0) {
        const responses = bestMatch.data.responses;
        response = responses[Math.floor(Math.random() * responses.length)];
      } else {
        response = "I'm not sure about that specific question. I can help with:\n• Bidding & auto-bid\n• Wallet & payments\n• Escrow & delivery\n• Becoming a seller\n• Disputes & refunds\n• Account & verification\n• Fees & pricing\n• Security & fraud\n\nTry asking something like 'How do I place a bid?' or 'What is escrow?'";
      }

      await this.logConversation(userId, message, response, bestMatch?.category || 'unknown');

      return {
        success: true,
        response,
        category: bestMatch?.category || 'general',
        confidence: highestScore
      };
    } catch (error) {
      console.error('AI Assistant error:', error);
      return {
        success: false,
        response: "I'm having trouble right now. Please try again or contact support at contact@ethiopianauction.com",
        error: error.message
      };
    }
  }

  calculateMatchScore(message, keywords) {
    let score = 0;
    for (const keyword of keywords) {
      if (message.includes(keyword.toLowerCase())) {
        score += keyword.split(' ').length;
      }
    }
    return score;
  }

  async logConversation(userId, userMessage, botResponse, category) {
    try {
      await query(
        `INSERT INTO virtual_assistant_logs 
         (user_id, user_message, bot_response, category, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT DO NOTHING`,
        [userId || null, userMessage, botResponse, category]
      );
    } catch (error) {
      // Don't crash on log failure
    }
  }

  async getConversationHistory(userId, limit = 10) {
    try {
      const result = await query(
        `SELECT user_message, bot_response, category, created_at
         FROM virtual_assistant_logs
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2`,
        [userId, limit]
      );
      return { success: true, history: result.rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getPopularQuestions(limit = 10) {
    try {
      const result = await query(
        `SELECT category, COUNT(*) as count
         FROM virtual_assistant_logs
         WHERE created_at > NOW() - INTERVAL '30 days'
         GROUP BY category
         ORDER BY count DESC
         LIMIT $1`,
        [limit]
      );
      return { success: true, questions: result.rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getSuggestedQuestions(context = 'general') {
    const suggestions = {
      general: [
        "How do I place a bid?",
        "How do I add funds to my wallet?",
        "What is escrow and how does it work?",
        "How do I become a seller?"
      ],
      auction: [
        "What's the minimum bid increment?",
        "How does auto-bid work?",
        "What happens when I win an auction?",
        "Can I cancel my bid?"
      ],
      payment: [
        "What payment methods are accepted?",
        "How do I add funds to my wallet?",
        "Are there any buyer fees?",
        "How do I get a refund?"
      ],
      seller: [
        "How do I apply to become a seller?",
        "What are the seller commission rates?",
        "How do I create an auction?",
        "What documents do I need to sell?"
      ],
      dispute: [
        "How do I open a dispute?",
        "What happens if I don't receive my item?",
        "How long does dispute resolution take?",
        "Can I get a refund after confirming delivery?"
      ],
      security: [
        "How does fraud detection work?",
        "Is my payment safe?",
        "What is shill bidding?",
        "How do I report a scam?"
      ]
    };
    return suggestions[context] || suggestions.general;
  }
}

module.exports = new AIAssistantService();
