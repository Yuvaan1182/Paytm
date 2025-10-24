# Paytm Frontend Project

## Features
- **User Authentication**: Login and registration functionality with Google OAuth.
- **Account Management**: Manage user accounts, including balance updates and transaction history.
- **Responsive Design**: Fully responsive UI built with React and TailwindCSS.
- **API Integration**: Proxy setup for seamless communication with the backend.
- **Dockerized Deployment**: Multi-stage Dockerfile for production-ready builds.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **State Management**: Redux Toolkit
- **Backend**: Express.js (assumed for API integration)
- **Build Tool**: Vite
- **Containerization**: Docker

## Steps to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- Docker (if using containerized deployment)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/Paytm.git
   cd paytm
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

### Docker Deployment
1. Build the Docker image:
   ```bash
   docker build -t paytm-frontend .
   ```
2. Run the Docker container:
   ```bash
   docker run -d -p 8080:80 paytm-frontend
   ```
3. Access the application:
   ```
   http://localhost:8080
   ```

## Contribution Guidelines

### How to Contribute
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them.
4. Push your branch to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request (PR) to the main repository.

### Commit Style
Follow the conventional commit style:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc.)
- **refactor**: Code refactoring (no functional changes)
- **test**: Adding or updating tests
- **chore**: Changes to the build process or auxiliary tools

Example:
```bash
feat: add Google OAuth login functionality
```

### Raising a Pull Request
1. Ensure your branch is up-to-date with the main branch:
   ```bash
   git pull origin main
   ```
2. Open a PR with a clear title and description of your changes.
3. Add reviewers if applicable.

## License
This project is licensed under the MIT License.
