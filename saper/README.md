# Saper (Minesweeper)

A classic Minesweeper game implemented in vanilla JavaScript. Uncover cells, avoid mines, and test your logic skills in this timeless puzzle game.

## 📋 Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Game](#running-the-game)
- [Project Structure](#project-structure)
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Support](#support)

## What It Does

Saper is a faithful implementation of the classic Minesweeper puzzle game. The goal is to uncover all non-mine cells without clicking on any mines. The game provides hints by showing the number of adjacent mines, making it a game of logic and deduction.

## Features

- ✅ **Configurable Grid** - Choose custom width, height, and mine count
- ✅ **Player Tracking** - Enter your name to track game statistics
- ✅ **Real-time Timer** - Monitor elapsed time during gameplay
- ✅ **Mine Counter** - See remaining mines to find
- ✅ **Win/Loss Detection** - Automatic game completion detection
- ✅ **Responsive Design** - Works on desktop and tablet browsers
- ✅ **Classic Gameplay** - Traditional Minesweeper rules and mechanics
- ✅ **Quick Restart** - Start a new game at any time

## Tech Stack

### Frontend
- **HTML5** - Game structure and layout
- **CSS3** - Game styling and responsive design
- **JavaScript (ES6+)** - Game logic and interactivity
- **Vanilla JavaScript** - No frameworks or dependencies

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Running the Game

**Option 1: Direct Browser**
1. Simply open `index.html` in your web browser
2. The game loads immediately

**Option 2: Local Server (Recommended)**

Using Python:
```bash
cd saper
python -m http.server 8000
```

Using Node.js http-server:
```bash
cd saper
npx http-server
```

Then open your browser to `http://localhost:8000` (Python) or `http://localhost:8080` (http-server)

Using Node.js built-in server:
```bash
cd saper
node -e "require('http').createServer((req,res)=>{require('fs').readFile(__dirname+req.url,(err,data)=>res.end(data))}).listen(8000)"
```

## Project Structure

```
saper/
├── index.html                # Game HTML structure
├── src/
│   └── index.js             # Complete game logic and implementation
├── styles/
│   └── index.css            # Game styling and animations
├── images/                  # Game assets and graphics
└── README.md               # This file
```

## How to Play

### Game Setup

1. **Open the game** in your browser
2. **Enter your name** (optional, for tracking)
3. **Set game parameters:**
   - **Width** - Number of columns (default: 10)
   - **Height** - Number of rows (default: 10)
   - **Mines** - Number of mines to hide (should be less than width × height)
4. **Click "Start Game"** to begin

### During Gameplay

1. **Left-click** on a cell to reveal it
2. **Numbers** indicate adjacent mines (1-8)
3. **Right-click** (or alternate action) to flag suspected mines
4. **Use numbers as clues** to deduce mine locations
5. **Avoid clicking mines** - clicking a mine ends the game

### Game Completion

- **Win**: Reveal all non-mine cells
- **Loss**: Click on a mine
- **Game Result** is displayed with option to play again

## Game Rules

1. The grid contains hidden mines and safe cells
2. Click on any cell to reveal it
3. A revealed cell shows:
   - A number (1-8) = adjacent mine count
   - Empty = no adjacent mines
   - Mine = game over
4. Use logic to determine safe cells
5. Flag cells you believe contain mines
6. Win by revealing all non-mine cells
