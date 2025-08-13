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

# - The Enhencement Project
This enhancement extends the existing account management system by adding an
account list view with a dynamic last name search and real-time account count,
improving how users query and interact with account data. It interacts directly with the
database through the account model’s query methods to retrieve account records. The
account controller is updated with new functions to support queries and pass data to the
view. The account list view is enhanced to include the search input, dynamic table
display, and live account count. The model uses prepared SQL statements and error
handling in the controller to ensure robustness and data integrity. Access control is used
to check that only admin roles can view accounts.
