# Library Lending App

The Library Lending App is a comprehensive and user-friendly web application designed to streamline the management of books, members, and lending transactions in a library setting. Built using modern web technologies such as Node.js, Express.js, MSSQL, and EJS, this application provides an intuitive interface and efficient backend processes to facilitate smooth and organized library operations.

By leveraging the power of CRUD operations and SQL transactions, the Library Lending App ensures data consistency and accurate record-keeping. With an emphasis on ease-of-use, the application offers library staff the tools they need to maintain their collections and manage member interactions effectively.

## Features

- User-friendly interface for managing books, members, and lending transactions
- Efficient CRUD operations for creating, reading, updating, and deleting records
- Robust SQL transactions to maintain data consistency and integrity
- Pagination support for better data organization and presentation
- Responsive design to support various devices and screen sizes

## Directory Structure

```
library-lending-app/
  ├── controllers/
  │   ├── bookController.js
  │   ├── memberController.js
  │   ├── lendingController.js
  ├── models/
  │   ├── bookModel.js
  │   ├── memberModel.js
  │   ├── lendingModel.js
  ├── public/
  ├── views/
  │   ├── pages/
  │   │   ├── book-related/
  │   │   │   ├── book.ejs
  │   │   │   ├── create-book-form.ejs
  │   │   │   ├── edit-book-form.ejs
  │   │   ├── member-related/
  │   │   │   ├── member.ejs
  │   │   │   ├── create-member-form.ejs
  │   │   │   ├── edit-member-form.ejs
  │   │   ├── lending-related/
  │   │   │   ├── lending.ejs
  │   │   │   ├── create-lending-form.ejs
  │   │   ├── home.ejs
  │   │   ├── error.ejs
  ├── routes/
  │   ├── bookRoutes.js
  │   ├── memberRoutes.js
  │   ├── lendingRoutes.js
  ├── app.js
  ├── .env
  ├── .env.example
  ├── package.json
  ├── package-lock.json
  ├── .gitignore
```

## Prerequisites

- Node.js >= 14.x
- MSSQL Server

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Library-Lend-System/library-lending-app.git
   cd library-lending-app
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env` and update the database connection information:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials:

   ```
   DB_USER=<your-database-username>
   DB_PASSWORD=<your-database-password>
   DB_HOST=<your-database-host>
   DB_PORT=<your-database-port>
   DB_NAME=<your-database-name>
   ```
   

4. Run the app using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   The app should now be running at `http://localhost:3000`.

