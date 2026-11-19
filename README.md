# CSE Motors — vehicle inventory management

My CSE 340 (Web Backend Development) project at BYU–Pathway Worldwide: **CSE Motors**, a Node.js MVC web app for a car dealership. Visitors browse vehicles by classification. Staff and admins manage classifications, inventory items and accounts.

## Features

- **Accounts:** register, log in and out (JWT stored in a cookie, bcrypt password hashing), update personal details and change password.
- **Roles:** only Employee and Admin accounts can manage inventory or see the account list.
- **Inventory:** add classifications, then add, edit and delete vehicles with images and thumbnails.
- **Navigation** is built from the classifications in the database.
- **Validation:** server-side checks with express-validator, with sticky form data so nothing is lost on an error.
- **Errors:** flash messages, a 404 page and an error page (`/trigger-error` tests it).

## Enhancement: account list with search

The account list view (`/accounts/accountsView`, for Employee and Admin accounts) adds:

- a last-name search that filters the table as you type,
- a live count of matching accounts,
- delete from the list.

The account model gains query methods using prepared SQL statements. The controller passes the results to the view, handles errors, and checks the account type before showing anything.

## Built with

Node.js, Express, EJS (express-ejs-layouts), PostgreSQL (`pg`, `connect-pg-simple` for sessions), JSON Web Tokens, bcryptjs, express-validator, connect-flash and cookie-parser.

## Project structure

```
server.js       Express app, sessions, JWT check, routes and error handlers
controllers/    route logic (accounts, inventory, base)
models/         database queries
routes/         accountRoute.js (/accounts), inventoryRoute.js (/inv), static.js
utilities/      navigation builder, validation rules, auth helpers
views/          EJS templates (accounts/, inventory/, errors/, layouts/, partials/)
public/         CSS, JavaScript and vehicle images
database/       SQL for the schema, seed data and assignment queries
```

## Run it locally

Requires Node.js and a PostgreSQL database.

```bash
pnpm install       # or npm install
pnpm run dev       # restarts on changes
```

Create `.env` with:

| Variable | What |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Secret for session cookies |
| `ACCESS_TOKEN_SECRET` | Secret for signing JWTs |
| `PORT`, `HOST` | Where the server listens |

Build the database with `database/cs340-db.sql` before the first run.
