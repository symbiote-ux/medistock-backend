# Medistock - A Comprehensive Medicine Inventory Management - Backend

## Overview

The backend for the Medicine Inventory Management is built with Node.js, PostgreSQL, and Prisma. It provides API endpoints for managing customers, medicines, authentication, and more.

## Prerequisites

Before setting up the backend, make sure you have the following installed:

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2. **PostgreSQL**: Install PostgreSQL and start the service. On macOS, you can use [Homebrew](https://brew.sh/):

   ```bash
   brew install postgresql
   brew services start postgresql
   ```

3. **Prisma**: Install Prisma globally if it's not already installed:

   ```bash
   npm install -g prisma
   ```

## Setup

### 1. Clone the Repository

Clone the repository and navigate into the backend directory:

    ```bash
    git clone https://github.com/symbiote-ux/medistock-backend.git
    cd medistock-backend
    ```

### 2. Install Dependencies

Install the backend dependencies:

    ```bash
    npm install
    ```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    ```

Replace `user`, `password`, and `mydatabase` with your PostgreSQL credentials.

### 4. Database Setup and Migrations

Run the migrations and generate Prisma client:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

### 5. Start the Development Server

Start the development server:

    ```bash
    npm run dev
    ```

For production, use:

    ```bash
    npm start
    ```

The backend will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/auth/signup`: Register a new user.
- **POST** `/auth/login`: Log in and obtain a JWT token.

### Customer Management

- **GET** `/customers`: Get all customers .
- **GET** `/customers/:id`: Get a customer by ID.
- **POST** `/customers`: Add a new customer.
- **PUT** `/customers/:id`: Update a customer.
- **DELETE** `/customers/:id`: Delete a customer.

### Medicine Management

- **GET** `/medicines`: Get all medicines.
- **GET** `/medicines/:id`: Get medicine by ID.
- **POST** `/medicines`: Add a new medicine.
- **PUT** `/medicines/:id`: Update a medicine.
- **DELETE** `/medicines/:id`: Delete a medicine.

### Purchase Management

- **GET** `/purchases`: Get all purchases.
- **GET** `/purchases/:id`: Get purchases by ID.
- **POST** `/purchases`: Add a new purchases.
- **DELETE** `/purchases/:id`: Delete a purchases.

### Additional Endpoints - In Future Enhancement

- **GET** `/customers/:id/purchases`: Get all purchases made by a specific customer.
- **GET** `/medicines/:id/purchases`: Get all purchases related to a specific medicine.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
