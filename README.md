# E-Gram-Panchayat

Web solution to bridge the rural digital divide — online Gram Sabha meetings, village dashboards, and essential services.

## Local setup (quick)
1. Clone repo:
   `git clone https://github.com/Ananya-R2004/E-Gram-Panchayat.git`

# Interface team branch
`git checkout -b feature/interface`

`git push -u origin feature/interface`

# Switch back to main
`git checkout main`

# Video call team branch
`git checkout -b feature/video-call`
`git push -u origin feature/video-call`

# Services branch (later)
`git checkout main`

`git checkout -b feature/services`
`git push -u origin feature/services`

# Back to main
`git checkout main`


## Branch strategy
- `main` default — production/integration only
- `feature/interface` — dashboards, login, village admin
- `feature/video-call` — conferencing module
- `feature/services` — agriculture/health/education modules

## Team roles
- Interface team: work inside `client/src/pages`, `server/routes`, `modules/interface`
- Video team: work inside `modules/video-call`, `client/src/components/VideoCall`

