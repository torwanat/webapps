# Bookstore CRUD

A full-stack bookstore application for managing a book inventory with complete CRUD (Create, Read, Update, Delete) functionality. The application features a responsive React frontend with TypeScript type safety and a PHP backend connected to a MySQL database.

## 📋 Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
  - [Backend Setup](#backend-setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Support](#support)

## What It Does

The Bookstore CRUD application provides an intuitive interface for managing a book inventory. Users can add new books, view all books in a table format, edit book details, and remove books from the inventory. The application persists data to a MySQL database, ensuring information is maintained between sessions.

## Features

- ✅ **Create** - Add new books to the inventory with title, author, and other details
- ✅ **Read** - View all books in a sortable, searchable table
- ✅ **Update** - Edit existing book information
- ✅ **Delete** - Remove books from the inventory
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Real-time Updates** - Immediate UI updates after database operations
- ✅ **Type Safety** - Full TypeScript support for reliable code

## Tech Stack

### Frontend
- **React 18** - UI library for building the user interface
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server with Hot Module Replacement (HMR)
- **CSS** - Custom styling for responsive design
- **ESLint** - Code quality and consistency checking

### Backend
- **PHP** - Server-side scripting language
- **MySQL** - Relational database for data persistence

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Required for npm and Vite
- **npm** or **yarn** - Package manager
- **PHP** (v7.4 or higher) - For backend API
- **MySQL** (v5.7 or higher) - For database
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. Navigate to the project directory:
   ```bash
   cd bookstore-CRUD
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

Changes to your source files will automatically reload the application in your browser.

### Production Build

Build the application for production:

```bash
npm run build
```

The build artifacts will be generated in the `dist/` directory. These optimized files are ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

### Backend Setup

1. **Create the database:**
   - Import the SQL schema:
     ```bash
     mysql -u root -p < database/bookstore_final.sql
     ```

2. **Configure PHP backend:**
   - Update database connection details in `backend/config.php`:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'root');
     define('DB_PASS', 'your_password');
     define('DB_NAME', 'bookstore_db');
     ```

3. **Start a PHP development server:**
   ```bash
   cd backend
   php -S localhost:8000
   ```

4. **CORS Configuration:**
   - Update API endpoints in frontend code if PHP server is on a different port
   - Ensure `backend/headers.php` sets appropriate CORS headers

### Linting

Check code quality and TypeScript errors:

```bash
npm run lint
```

## Project Structure

```
bookstore-CRUD/
├── src/
│   ├── components/
│   │   ├── Table.tsx          # Main book table component
│   │   └── EditRow.tsx        # Row editing functionality
│   ├── App.tsx                # Root component
│   ├── App.css                # Application styling
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles
├── backend/
│   ├── config.php             # Database configuration
│   ├── headers.php            # CORS headers
│   ├── read.php               # GET endpoint
│   ├── create.php             # POST endpoint
│   ├── update.php             # PUT endpoint
│   └── delete.php             # DELETE endpoint
├── database/
│   └── bookstore_final.sql    # Database schema
├── public/                    # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## Usage

### Adding a Book

1. Fill in the book details in the input form
2. Click "Add Book" button
3. The new book appears in the table instantly

### Viewing Books

All books are displayed in a table with columns for:
- Name
- Surname (Author)
- Title
- Borrowed Date
- Return Date
- Actions (Edit/Delete)

### Editing a Book

1. Click the "Edit" button for any book in the table
2. Modify the details in the form
3. Click "Save" to update the database

### Deleting a Book

1. Click the "Delete" button for the book to remove
2. Confirm the deletion
3. The book is immediately removed from the table and database
