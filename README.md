# E-Gram-Panchayat

Web solution to bridge the rural digital divide — online Gram Sabha meetings, village dashboards, and essential services.

## Local setup (quick)
1. Clone repo:
   `git clone https://github.com/Ananya-R2004/E-Gram-Panchayat.git`
2. Install:
   - `cd client && npm install`
   - `cd ../server && npm install`
3. Run:
   - Server: `cd server && npm run dev`
   - Client: `cd client && npm start`

## Branch strategy
- `main` — production/integration only
- `feature/interface` — dashboards, login, village admin
- `feature/video-call` — conferencing module
- `feature/services` — agriculture/health/education modules

## Team roles
- Interface team: work inside `client/src/pages`, `server/routes`, `modules/interface`
- Video team: work inside `modules/video-call`, `client/src/components/VideoCall`

