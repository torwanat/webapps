# Currency Show

A currency exchange display and showcase application built with Angular. Displays exchange rates and currency information in a visually appealing format.

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

Currency Show is a specialized application for displaying and showcasing currency exchange rates. It provides a visually rich interface for viewing real-time currency information and exchange rates between different currencies.

## Features

- ✅ **Exchange Rate Display** - View current rates for multiple currencies
- ✅ **Visual Presentation** - Attractive display of currency information
- ✅ **Real-time Updates** - Current market data
- ✅ **Multiple Currencies** - Support for major world currencies
- ✅ **Responsive Design** - Works on all device sizes
- ✅ **Angular Architecture** - Built with modern Angular framework
- ✅ **TypeScript** - Type-safe currency data handling

## Tech Stack

### Frontend
- **Angular 15** - Application framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive data handling
- **CSS** - Responsive styling
- **Angular Forms** - Form-based currency selection
- **Angular Router** - Navigation between views

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
   cd "Currency Show"
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
Currency Show/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Main template
│   │   ├── app.component.css      # Styles
│   │   ├── app.module.ts          # Module definition
│   │   └── ...other components
│   ├── index.html                 # HTML entry point
│   ├── main.ts                    # Angular bootstrapping
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Usage

1. **Open the application** in your browser
2. **View currency information** on the main display
3. **Select currencies** to see exchange rates
4. **Browse** through different currency pairs
5. **Check rates** for your currencies of interest

## Testing

Run unit tests:

```bash
npm test
```

Run tests with code coverage:

```bash
npm test -- --code-coverage
```

Run end-to-end tests:

```bash
npm run e2e
```
