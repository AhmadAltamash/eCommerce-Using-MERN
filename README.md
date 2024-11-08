# E-Commerce Project

This is a full-stack eCommerce application built with the **MERN** stack (MongoDB, Express, React, Node.js). The application simulates an eCommerce website similar to Amazon, allowing users to browse products, add them to the cart, and proceed to checkout.

## Features

- **Product Listing Page**: Displays a list of products with filtering options.
- **Product Detail Page**: View detailed information about a selected product.
- **Add to Cart**: Users can add products to their cart without login.
- **Checkout Page**: Users can proceed to checkout and simulate payment.
- **Admin Role (Conditional Rendering)**: Admins can manage products via a simple interface (e.g., add, edit, delete).

## Technologies Used

- **Frontend**:
  - React.js
  - React Router
  - Axios (for API calls)
  - Context API (for global state management)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)

- **Other**:
  - JWT (for token-based authentication)
  - Postman (for API testing)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas for a cloud solution)

### Clone the repository

```bash
git clone https://github.com/AhmadAltamash/eCommerce-Project.git
cd eCommerce-Project
```

## Install dependencies
1. For the backend:
```bash
cd backend
npm install
```

2. For the frontend:
```bash
cd frontend
npm install
```

## Setup environment variables
Create a .env file in the backend directory and add the following variables:
```bash
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-secret-key>
```

## Run the Application
1. Start the backend server:
```bash
cd backend
npm run dev
```
2. Start the frontend development server:
```bash
cd frontend
npm start
```
Your application should now be running on http://localhost:3000.


### Project Structure
```bash
eCommerce-Project/
├── backend/                # Server-side code
│   ├── models/             # Database models (e.g., Product, User)
│   ├── routes/             # API routes (e.g., products, users)
│   ├── controllers/        # Logic for handling API requests
│   └── server.js           # Entry point for the backend server
│
└── frontend/               # Client-side code
    ├── components/         # Reusable React components
    ├── pages/              # Page components (Home, Product Details, Checkout)
    ├── context/            # Global state management (React Context)
    └── App.js              # Entry point for the React app
```

### Contributing
Contributions are welcome! Please fork this repository and submit a pull request with any improvements or bug fixes.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
- React.js
- Node.js
- MongoDB
- Express.js
