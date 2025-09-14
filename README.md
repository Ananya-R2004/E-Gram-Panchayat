E-GRAM-PANCHAYAT/
│   README.md
│   package.json
│
├── client/                   # React frontend
│   └── src/
│       ├── assets/
│       ├── pages/
│       ├── utils/
│       │    └── api.js       # axios calls → login, otp, google
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       └── index.css
│
├── modules/                  # Models + Routes (you already keep them here)
│   ├── AdminList.js
│   ├── User.js               # Add fields: email, otp, otpExpiry
│   ├── authRoutes.js         # Define /login, /register, /otp, /google
│   └── authController.js     # NEW → put all auth logic here
│
│
├── server/                   # Backend entry
│   ├── index.js              # Mount authRoutes + init passport
│   ├── .env                  # EMAIL creds, GOOGLE_CLIENT_ID/SECRET, JWT_SECRET
│   └── package.json
│
└── database/                 
    └── (future migrations/seeds)
