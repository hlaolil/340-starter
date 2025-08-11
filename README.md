 Vehicle Inventory Management System
A Node.js MVC-based web application for managing vehicle classifications, inventory items, and user accounts with authentication, form validation, and dynamic navigation.

📋 Features
User registration, login, and authentication (JWT-based).

Role-based access control for inventory management.

CRUD operations for vehicle classifications and inventory items.

Image and thumbnail handling for inventory.

Account management: update personal details & change password.

Server-side form validation with sticky form data.

Dynamic navigation menu generated from database classifications.

PostgreSQL database integration.

🛠 Tech Stack
Backend: Node.js, Express.js

Frontend: EJS templating, HTML, CSS, JavaScript

Database: PostgreSQL

Authentication: JSON Web Tokens (JWT), bcrypt password hashing

Validation: express-validator

Other: dotenv, connect-flash, cookie-parser

📂 Project Structure
csharp
Copy
Edit
project/
│── controllers/       # Route logic
│── models/            # Database queries
│── routes/            # Route definitions
│── utilities/         # Helper functions
│── views/             # EJS templates
│── public/            # Static assets
│── database/          # SQL schema & seed files
│── .env.example       # Example environment file
│── README.md          # Project documentation
