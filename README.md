E-Gram-Panchayat/
├── client/                 # React Frontend
│   ├── public/            
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/       # 👤 AB 
│   │   │   │   ├── Login.js       👤 AB
│   │   │   │   ├── Signup.js      👤 AB  
│   │   │   │   └── Auth.css       👤 AB
│   │   │   ├── Home/       # 👤 AK 
│   │   │   └── Dashboard/  # 👥 BOTH (COORDINATION)
│   │   ├── App.js          # 👥 BOTH (COORDINATION)
│   │   ├── App.css         # 👥 BOTH (COORDINATION)
│   │   └── index.js        # 👤 SETUP ONCE
│   ├── package.json        # 👥 BOTH UPDATE
│   ├── requirements.txt    # 👥 BOTH REFERENCE
│   └── README.md           
├── server/                 # Node.js Backend - 👤 AB 
│   ├── config/
│   │   └── database.js     # 👤 AB
│   ├── routes/
│   │   └── auth.js         # 👤 AB
│   ├── middleware/
│   │   └── auth.js         # 👤 AB
│   ├── .env                # 👤 AB
│   ├── .env.example        # 👤 AB
│   ├── server.js           # 👤 AB
│   ├── package.json        # 👤 AB
│   ├── requirements.txt    # 👤 AB
│   └── README.md           
├── database/               # 👤 AB
│   ├── schema.sql          # 👤 AB
│   └── README.md           
├── modules/                # FOR SERVICES
│   └── README.md           
├── README.md               # 👥 MAIN README
└── .gitignore             # 👥 BOTH