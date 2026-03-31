# 🌾 Thanjavur Arasi Aalai — Wholesale E-Commerce

Full-stack wholesale grocery e-commerce platform built with React, Node.js, MongoDB, and Razorpay.

---

## 📁 Folder Structure

```
SHOP/
├── server/                  # Node.js + Express backend
│   ├── config/db.js         # MongoDB connection
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT protect + adminOnly
│   │   └── error.js         # Centralized error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── seed.js              # Sample data seeder
│   ├── index.js             # Entry point
│   └── .env                 # Environment variables
│
└── client/                  # React + Vite frontend
    └── src/
        ├── context/
        │   ├── AuthContext.jsx   # Auth state
        │   └── CartContext.jsx   # Cart state (localStorage)
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── ProductCard.jsx
        │   ├── Spinner.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Products.jsx
        │   ├── Cart.jsx
        │   ├── Checkout.jsx      # Razorpay integration
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Orders.jsx
        │   ├── OrderDetail.jsx
        │   └── admin/
        │       ├── AdminLayout.jsx
        │       ├── Dashboard.jsx
        │       ├── AdminProducts.jsx
        │       └── AdminOrders.jsx
        └── utils/api.js          # Axios instance
```

---

## ⚙️ Environment Variables

### `server/.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/thanjavur_arasi_aalai
JWT_SECRET=your_super_secret_jwt_key_change_this
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:3000
```

### `client/.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

---

## 🚀 Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)
- Razorpay account (test keys from https://dashboard.razorpay.com)

### 1. Install dependencies
```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Configure environment
- Edit `server/.env` with your MongoDB URI, JWT secret, and Razorpay keys
- Edit `client/.env` with your Razorpay Key ID

### 3. Seed sample data
```bash
cd server && node seed.js
```
This creates 18 products and an admin account:
- **Admin:** admin@arasi.com / admin123

### 4. Start the servers
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 🔑 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login |
| GET | /api/auth/profile | User | Get profile |
| GET | /api/products | Public | List products (filter/search/paginate) |
| POST | /api/products | Admin | Add product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Soft delete product |
| POST | /api/orders | User | Create order + Razorpay order |
| POST | /api/orders/verify-payment | User | Verify Razorpay signature |
| GET | /api/orders/my-orders | User | Get own orders |
| GET | /api/orders/admin/all | Admin | Get all orders |
| PUT | /api/orders/:id/status | Admin | Update order status |

---

## 💳 Razorpay Test Cards

Use these in test mode:
- **Card:** 4111 1111 1111 1111 | Expiry: any future | CVV: any
- **UPI:** success@razorpay

---

## 🗺️ Shop Location

[Thanjavur Arisi Aalai on Google Maps](https://www.google.com/maps/place/Thanjavur+Arisi+Aalai)

---

## 🔒 Security Features

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens expire in 7 days
- Razorpay payment verified server-side using HMAC SHA256
- Admin routes protected by role middleware
- Input validation on all POST routes
- Stock deducted only after payment verification
