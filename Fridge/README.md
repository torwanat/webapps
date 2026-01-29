# Fridge Manager

A fridge inventory management application for tracking food items and monitoring expiration dates. 

## 📋 Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Support](#support)

## What It Does

The Fridge Manager application helps you keep track of what's in your refrigerator. Add food items with their expiration dates, organize them by categories, and get alerts when items are about to expire. Never throw away forgotten food again!

## Features

- ✅ **Item Tracking** - Add and track food items in your fridge
- ✅ **Expiration Dates** - Monitor expiration dates for all items
- ✅ **Add/Remove Items** - Easily manage your fridge contents
- ✅ **Persistent Storage** - Data saved between sessions
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Quick Overview** - See all items at a glance

## Tech Stack

### Frontend
- **TypeScript** - Type-safe JavaScript for the application logic
- **Webpack** - Module bundler for optimized builds
- **CSS** - Custom styling
- **HTML5** - Document structure

### Backend
- **PHP** - Server-side persistence (optional)

### Development Tools
- **npm** - Package manager

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Required for npm and Webpack
- **npm** - Package manager
- A modern web browser
- **PHP** (v7.4 or higher) - Optional, for persistent backend storage

### Installation

1. Navigate to the project directory:
   ```bash
   cd Fridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Build the application for development:

```bash
npm run build
```

This compiles TypeScript and bundles your code using Webpack. The output is in the `dist/` directory.

To watch for changes during development (if configured):

```bash
npm run watch
```

### Production Build

Build the application for production:

```bash
npm run build
```

Production builds are optimized for size and performance.

## Project Structure

```
Fridge/
├── src/
│   ├── index.ts              # Main entry point
│   ├── Board.ts              # Fridge board management
│   ├── Box.ts                # Individual item (box) class
│   ├── Templates.ts          # Type definitions and interfaces
│   └── startPage.ts          # Initial page setup
├── styles/
│   └── index.css             # Application styling
├── index.html                # HTML entry point
├── get.php                   # GET endpoint (optional)
├── send.php                  # POST endpoint (optional)
├── webpack.config.js         # Webpack configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── README.md                # This file
```

## Usage

### Opening the Application

1. Open `index.html` in your web browser
2. The fridge manager will load with your previously saved items

### Adding Items

1. Click "Add Item" or the "+" button
2. Enter the item name
3. Set the expiration date
4. Click Save

### Viewing Items

- All items are displayed in the fridge board view
- Items are color-coded or visually distinguished by expiration status
- Scroll through the list to see all items

### Removing Items

1. Click on an item in the fridge
2. Select "Remove" or press Delete
3. Confirm the removal

### Editing Items

1. Click on an existing item
2. Modify the name or expiration date
3. Click Save

## Backend Setup (Optional)

If you want persistent storage with PHP:

1. **Configure PHP endpoints:**
   - Update the API URLs in `src/startPage.ts`
   - Point to your PHP server location

2. **Set up PHP handlers:**
   - Configure `get.php` to fetch items from database
   - Configure `send.php` to save items to database

3. **Database setup:**
   - Create a database table for fridge items
   - Ensure PHP has write permissions
