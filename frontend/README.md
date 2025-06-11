# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Paytm Account API Request Layer

## High-Level Design (HLD)

This module provides API request functions for account-related operations in the Paytm frontend application. It acts as a bridge between the frontend UI and the backend REST API, handling authentication, error management, and HTTP requests for account actions such as transferring funds and adding money to the wallet.

### Key Features
- Handles secure API requests to the backend for account operations.
- Manages authentication using tokens stored with expiry.
- Provides error handling and user feedback for failed requests.
- Exposes functions for transferring funds and adding money to the wallet.

### Main Functions
- `transferFunds`: Initiates a fund transfer between accounts.
- `addMoneyToWallet`: Adds money to the user's wallet.

## Low-Level Design (LLD)

### File: `src/apireq/accounts/account.js`

#### Dependencies
- `axios`: For making HTTP requests.
- `errorHandler`: For displaying error messages to the user.
- `getWithExpiry`: Utility to retrieve tokens with expiry validation.

#### Constants
- `BASE_URL`: The base URL for API requests, using Vite's environment variable with a fallback to localhost.

#### Functions

##### 1. `transferFunds`
- **Input:** `transfer` object containing transfer details (e.g., to, amount, category).
- **Process:**
  - Retrieves the authentication token from local storage.
  - If the token is missing, triggers an error and aborts.
  - Sends a POST request to `/api/v1/account/transfer` with the transfer data and authorization header.
  - Handles errors by calling `errorHandler` and returning a rejected promise with error details.
- **Output:** Returns the response data on success or a rejected promise on failure.

##### 2. `addMoneyToWallet`
- **Input:** `transfer` object containing the amount to add.
- **Process:**
  - Retrieves the authentication token from local storage.
  - If the token is missing, triggers an error and aborts.
  - Sends a POST request to `/api/v1/account/add` with the transfer data and authorization header.
  - Handles errors by calling `errorHandler` and returning a rejected promise with error details.
- **Output:** Returns the response data on success or a rejected promise on failure.

#### Error Handling
- Both functions use a consistent error handling strategy:
  - If the backend returns an error response, the error is passed to the `errorHandler` and the promise is rejected with the error data.
  - If the error is unknown, a generic error message is returned.

#### Security
- All requests require a valid authentication token, which is included in the `Authorization` header as a Bearer token.

---

This design ensures a clean separation of concerns, with API logic isolated from UI components, and provides a robust, reusable interface for account-related API operations in the frontend.
