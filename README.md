# E-Gram-Panchayat

Web solution to bridge the rural digital divide — online Gram Sabha meetings, village dashboards, and essential services.

## Local setup (quick)
1. Clone repo:
   `git clone https://github.com/Ananya-R2004/E-Gram-Panchayat.git`

Terminal 1 — Main Web App
npm run dev

Terminal 2 — Video Interface
cd videointerface
npm run dev

Terminal 3 — Education Service (VillageLearningHub)
cd services
cd education
cd VillageLearningHub
npm run dev

Terminal 4 — Issue Reporting Service
cd services
cd issuereporting
npm run dev

Terminal 5 — Agriculture Service

Note: agriculture does not have a dev script. You use:

cd services
cd agriculture
npm install
npm start

Terminal 6 — Healthcare Service
cd services
cd healthcare
npm install
npm start

Terminal 7 — Schemes Service

Install once:

cd services
cd schemes
npm install npm-run-all

Run:

npm run start-all

## Branch strategy
- `main` default — production/integration only
- `feature/interface` — dashboards, login, village admin
- `feature/video-call` — conferencing module
- `feature/services` — agriculture/health/education modules

## Team roles
- Interface team: work inside `client/src/pages`, `server/routes`, `modules/interface`
- Video team: work inside `modules/video-call`, `client/src/components/VideoCall`

