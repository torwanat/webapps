# Web Applications Portfolio

A collection of full-stack web applications built with modern frameworks and technologies. This portfolio demonstrates expertise in TypeScript, React, Angular, Node.js, and PHP development.

## 📋 Table of Contents

- [Overview](#overview)
- [Applications](#applications)
  - [Bookstore CRUD](#bookstore-crud)
  - [Currency Converter](#currency-converter)
  - [File Manager](#file-manager)
  - [Fridge Manager](#fridge-manager)
  - [Library Management](#library-management)
  - [Saper (Minesweeper)](#saper-minesweeper)
  - [Tic Tac Toe](#tic-tac-toe)
- [Getting Started](#getting-started)
- [Technologies](#technologies)

---

## Overview

This workspace contains seven distinct web applications showcasing different architectural patterns and technology stacks. Each application is self-contained with its own configuration and dependencies.

## Applications

### Bookstore CRUD

**Description:** A full-stack bookstore application with Create, Read, Update, Delete functionality for managing book inventory.

**Tech Stack:**
- Frontend: React 18, TypeScript, Vite
- Backend: PHP
- Database: MySQL

**Features:**
- Add, edit, and delete books
- Search and filter functionality
- Responsive table layout
- Real-time data updates

**Getting Started:**

1. Install dependencies:
   ```bash
   cd bookstore-CRUD
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Backend setup: Configure PHP server to connect to MySQL database (see `database/bookstore_final.sql`)

**Project Structure:**
- `src/` - React components and styling
- `backend/` - PHP API endpoints
- `database/` - Database schema and migrations

---

### Currency Converter

**Description:** A currency exchange rate converter application with real-time currency conversion.

**Tech Stack:**
- Angular 15
- TypeScript
- RxJS

**Features:**
- Convert between multiple currencies
- Real-time exchange rates
- User-friendly interface
- Form validation

**Getting Started:**

1. Install dependencies:
   ```bash
   cd Currency
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

**Project Structure:**
- `src/app/` - Angular components and services
- `src/index.html` - Application entry point

---

### File Manager

**Description:** A web-based file management system with image editing capabilities. Upload, organize, and manage files through a browser interface.

**Tech Stack:**
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Image Processing: Jimp
- Templating: Handlebars

**Features:**
- Upload and organize files
- Create and manage directories
- Image editing and preview
- File deletion and management

**Getting Started:**

1. Install dependencies:
   ```bash
   cd filemanager
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```
   The application will run on `http://localhost:3000`

3. Access the file manager interface in your browser

**Project Structure:**
- `server.js` - Express server configuration
- `static/` - Frontend CSS and JavaScript
- `views/` - Handlebars templates
- `upload/` - User file storage

---

### Fridge Manager

**Description:** A fridge inventory management application for tracking food items and their expiration dates.

**Tech Stack:**
- Frontend: TypeScript, Webpack
- Backend: PHP
- Styling: CSS

**Features:**
- Track food items in the fridge
- Monitor expiration dates
- Add and remove items
- Persistent storage

**Getting Started:**

1. Build the project:
   ```bash
   npm install
   npm run build
   ```

2. Open `index.html` in a browser

3. Backend setup: Configure PHP server for data persistence

**Project Structure:**
- `src/` - TypeScript application source
- `styles/` - CSS styling
- `webpack.config.js` - Build configuration

---

### Library Management

**Description:** An Angular-based library management system for tracking books, magazines, and library resources. Includes service-based architecture for data fetching.

**Tech Stack:**
- Angular 15
- TypeScript
- RxJS
- XML to JSON conversion

**Features:**
- Manage library inventory
- Browse books and magazines
- Year-based filtering
- Service-oriented architecture

**Getting Started:**

1. Install dependencies:
   ```bash
   cd Library
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

**Project Structure:**
- `src/app/` - Angular components and services
- `src/app/library/` - Library-specific components
- `src/app/fetch-service.service.ts` - Data fetching service

---

### Saper (Minesweeper)

**Description:** A classic Minesweeper game implementation in JavaScript. Uncover cells while avoiding mines.

**Tech Stack:**
- Frontend: HTML, CSS, JavaScript
- Vanilla JavaScript (no frameworks)

**Features:**
- Configurable grid size
- Mine placement
- Game logic and win/loss detection
- Responsive design

**Getting Started:**

1. Open `index.html` in a browser

2. Alternatively, serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js http-server
   npx http-server
   ```

3. Play the game in your browser

**Project Structure:**
- `index.html` - Game markup
- `src/index.js` - Game logic
- `styles/index.css` - Game styling

---

### Tic Tac Toe

**Description:** A Tic Tac Toe game implementation built with Angular. Play against the computer or another player.

**Tech Stack:**
- Angular 15
- TypeScript
- Component-based architecture

**Features:**
- Player vs Player mode
- Game state management
- Move validation
- Win detection
- Responsive board layout

**Getting Started:**

1. Install dependencies:
   ```bash
   cd TicTacToe
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

**Project Structure:**
- `src/app/app.component.ts` - Main game logic
- `src/app/app.component.html` - Game board template
- `src/app/app.component.css` - Game styling

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Required for npm-based projects
- **PHP** (v7.4 or higher) - For projects with PHP backends
- **MySQL** - For database-driven applications
- A modern web browser

### Installation

Each application is self-contained. To work with a specific project:

```bash
# Navigate to the project directory
cd <project-name>

# Install dependencies (if applicable)
npm install

# Follow the project-specific Getting Started section above
```

### Development Workflow

Most projects support the following commands:

```bash
# Start development server
npm start        # or npm run dev

# Build for production
npm run build

# Run tests (Angular/full-stack projects)
npm test

# Linting (projects with ESLint)
npm run lint
```

---

## Technologies

### Frontend
- **React** 18 - Component-based UI library
- **Angular** 15 - Full-featured framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Webpack** - Module bundler
- **CSS** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **PHP** - Server-side scripting

### Databases & Tools
- **MySQL** - Relational database
- **Handlebars** - Template engine
- **Jimp** - Image processing library
- **RxJS** - Reactive programming library
- **Jasmine** - Testing framework

---
