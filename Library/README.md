# Library Management System

A comprehensive library management application built with Angular. Manage books, magazines, and other library resources with a service-oriented architecture for efficient data handling.

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
- [Testing](#testing)
- [Support](#support)

## What It Does

The Library Management System provides a complete solution for managing library resources. Whether you're managing a school library, public library, or personal collection, this application makes it easy to track books, magazines, and other materials across multiple categories and time periods.

## Features

- ✅ **Book Management** - Add, edit, and delete book records
- ✅ **Magazine Management** - Track magazine collections
- ✅ **Search & Filter** - Find resources by title, author, year, or category
- ✅ **Year-based Organization** - Browse resources by publication year
- ✅ **Service Architecture** - Efficient data fetching with service layer
- ✅ **XML Support** - Import/export library data in XML format
- ✅ **Responsive Design** - Access on desktop and mobile devices
- ✅ **Real-time Updates** - Instant UI updates after operations

## Tech Stack

### Frontend
- **Angular 15** - Full-featured application framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming for async operations
- **Angular Forms** - Form building and validation
- **Angular Router** - Client-side navigation
- **CSS** - Responsive styling

### Services & Libraries
- **Fetch Service** - Custom service for data retrieval
- **ngx-xml-to-json** - XML to JSON conversion for data import
- **Angular CLI** - Development and build tools

### Testing
- **Karma** - Test runner
- **Jasmine** - Testing framework

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Required for npm
- **npm** - Package manager
- **Angular CLI** (v15 or compatible)
- A modern web browser

### Installation

1. Navigate to the project directory:
   ```bash
   cd Library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`. The page automatically reloads when you make changes to source files.

### Production Build

Build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory with all optimizations applied.

## Project Structure

```
Library/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Main template
│   │   ├── app.component.css      # Global styles
│   │   ├── app.module.ts          # Module definition
│   │   ├── fetch-service.service.ts   # Data fetching service
│   │   ├── library/               # Library management components
│   │   ├── books/                 # Book-specific components
│   │   ├── magazines/             # Magazine components
│   │   ├── years/                 # Year filtering components
│   │   ├── display/               # Display/preview components
│   │   └── back/                  # Navigation/utility components
│   ├── index.html                 # HTML entry point
│   ├── main.ts                    # Angular bootstrapping
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Usage

### Accessing the Library

1. Open the application in your browser
2. The main page displays your library overview

### Adding Resources

1. Navigate to the appropriate section (Books or Magazines)
2. Click "Add New" or the add button
3. Fill in the resource details (title, author, ISBN, year, etc.)
4. Click Save

### Searching Resources

1. Use the search bar to find resources by title or author
2. Filter by resource type (book/magazine)
3. Filter by publication year

### Browsing by Year

1. Navigate to the "Years" section
2. Select a year to view all resources published in that year
3. Browse the filtered list

### Editing Resources

1. Click on a resource in the list
2. Select "Edit" to modify details
3. Save your changes

### Viewing Details

1. Click on any resource
2. View complete information including:
   - Title and author
   - ISBN/publication details
   - Year of publication
   - Category information

## Testing

Run unit tests:

```bash
npm test
```

Run tests with code coverage:

```bash
npm test -- --code-coverage
```
