# Tic Tac Toe

A Tic Tac Toe game implementation built with Angular. Play against another player with complete game state management, move validation, and win detection.

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
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Testing](#testing)
- [Support](#support)

## What It Does

Tic Tac Toe is a classic turn-based game where two players compete on a 3x3 grid. This Angular implementation provides smooth gameplay, automatic win detection, and a clean, responsive interface.

## Features

- ✅ **Player vs Player** - Two-player local gameplay
- ✅ **Move Validation** - Only valid moves are allowed
- ✅ **Win Detection** - Automatic detection of winning patterns
- ✅ **Draw Detection** - Recognizes when the board is full
- ✅ **Game State Management** - Tracks current player and board state
- ✅ **Responsive Board** - Works on desktop and mobile devices
- ✅ **Reset Game** - Start a new game at any time
- ✅ **Score Tracking** - Keep track of wins (optional)

## Tech Stack

### Frontend
- **Angular 15** - Application framework
- **TypeScript** - Type-safe game logic
- **RxJS** - Reactive game state management
- **CSS** - Styling and board layout
- **Component-based Architecture** - Modular game components

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
   cd TicTacToe
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

The application will be available at `http://localhost:4200`. The page automatically reloads when you change source files.

### Production Build

Build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory with optimizations applied.

## Project Structure

```
TicTacToe/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Main game component
│   │   ├── app.component.html     # Game board template
│   │   ├── app.component.css      # Game styling
│   │   ├── app.component.spec.ts  # Unit tests
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

## How to Play

### Starting a Game

1. Open the application in your browser
2. The game board appears with an empty 3x3 grid
3. Player 1 (X) goes first

### Making Moves

1. Click on any empty cell to place your mark
2. Player X and O alternate turns
3. Each cell can only be played once
4. Current player indicator shows whose turn it is

### Winning

The game automatically detects winning combinations:
- **3 in a row** (horizontal)
- **3 in a column** (vertical)
- **3 in a diagonal**

When a player wins:
1. The winning combination is highlighted
2. A message displays the winner
3. The board is locked to prevent further moves
4. Click "New Game" to play again

### Draw

If all cells are filled and no player has won, the game is a draw.

## Game Rules

1. The game is played on a 3x3 grid (9 cells total)
2. One player is X, the other is O
3. Players alternate turns, X goes first
4. A player marks a cell on their turn
5. A player wins by getting 3 marks in a row (horizontal, vertical, or diagonal)
6. If all 9 cells are filled with no winner, it's a draw
7. Once a cell is marked, it cannot be changed

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
