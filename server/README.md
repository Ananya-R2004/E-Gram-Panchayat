Purpose of .env.example
.env (Actual file) - Your local configuration (never shared with Git)

Contains your personal database credentials

Has your actual JWT secret key

Added to .gitignore so it's never committed

.env.example (Template file) - Shared with your team (committed to Git)

Shows what environment variables are needed

Provides the structure without real values

Acts as documentation for setup