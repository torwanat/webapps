# Currency Converter

A modern currency exchange rate converter application built with Angular. Easily convert between multiple currencies with real-time exchange rates and an intuitive user interface.

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

The Currency Converter application provides a simple, fast way to convert money between different currencies. Whether you're traveling, conducting international business, or just curious about exchange rates, this tool makes currency conversion quick and easy.

## Features

- ✅ **Multi-Currency Support** - Convert between dozens of currencies
- ✅ **Real-time Exchange Rates** - Displays current market rates
- ✅ **Bidirectional Conversion** - Convert from and to any currency
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Form Validation** - Ensures valid input before conversion
- ✅ **User-Friendly Interface** - Clean, intuitive design for quick conversions
- ✅ **Fast Performance** - Instant conversion results

## Tech Stack

### Frontend
- **Angular 15** - Full-featured framework for building web applications
- **TypeScript** - Type-safe development with Angular
- **RxJS** - Reactive programming library for handling async operations
- **Angular Forms** - Form building and validation
- **Angular Router** - Client-side routing
- **CSS** - Styling and responsive design

### Testing
- **Karma** - Test runner for unit tests
- **Jasmine** - Testing framework

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - Required for npm
- **npm** - Package manager
- **Angular CLI** (v15 or compatible) - Command-line tool for Angular development
- A modern web browser

### Installation

1. Navigate to the project directory:
   ```bash
   cd Currency
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

The application will be available at `http://localhost:4200`. The page will automatically reload when you make changes to the source files.

### Production Build

Build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory with optimizations applied.

## Project Structure

```
Currency/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.component.html     # Main template
│   │   ├── app.component.css      # Styles
│   │   ├── app.module.ts          # App module definition
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

1. **Select Source Currency** - Choose the currency you want to convert from
2. **Enter Amount** - Type the amount you want to convert
3. **Select Target Currency** - Choose the currency to convert to
4. **View Result** - The converted amount displays instantly
5. **Reverse Conversion** - Swap currencies to convert in the opposite direction

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
