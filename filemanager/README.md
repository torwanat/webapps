# File Manager

A web-based file management system with integrated image editing capabilities. Upload, organize, create directories, and edit images directly through your browser.

## 📋 Table of Contents

- [What It Does](#what-it-does)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Support](#support)

## What It Does

The File Manager is a complete file management solution accessible through your web browser. It lets you upload files, organize them into folders, create directory structures, preview files, and edit images without needing desktop software. Perfect for collaborative file sharing or cloud-like storage management.

## Features

- ✅ **File Upload** - Upload single or multiple files
- ✅ **Directory Management** - Create and organize folders
- ✅ **File Operations** - Rename, move, and delete files
- ✅ **Image Editing** - Edit images directly in the browser
- ✅ **Image Preview** - Quick preview of image files
- ✅ **Responsive Interface** - Works on desktop and mobile
- ✅ **Real-time Updates** - Immediate reflection of changes
- ✅ **File Organization** - Hierarchical folder structure

## Tech Stack

### Frontend
- **HTML5** - Structure and layout
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Client-side logic and interactivity
- **Handlebars** - Server-side templating

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Formidable** - Form data and file upload handling
- **Jimp** - Image processing and editing
- **Express Handlebars** - Template engine for dynamic HTML

### File System
- **Native fs module** - File system operations

## Getting Started

### Prerequisites

- **Node.js** (v12 or higher) - Required for the server
- **npm** - Package manager
- A modern web browser
- Write permissions in the project directory for file uploads

### Installation

1. Navigate to the project directory:
   ```bash
   cd filemanager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

Start the file manager server:

```bash
node server.js
```

The application will be available at `http://localhost:3000`

To run on a different port:

```bash
PORT=8080 node server.js
```

### Development

For development with auto-restart on file changes, install nodemon:

```bash
npm install --save-dev nodemon
npx nodemon server.js
```

## Project Structure

```
filemanager/
├── server.js                  # Main Express server
├── package.json               # Dependencies
├── data/
│   └── data.json             # Application configuration
├── static/
│   ├── css/
│   │   └── index.css         # Frontend styles
│   └── js/
│       ├── filemanager.js    # File management logic
│       └── imageEditor.js    # Image editing logic
├── views/
│   ├── layouts/
│   │   └── main.hbs          # Main layout template
│   ├── partials/
│   │   ├── file.hbs          # File item partial
│   │   └── folder.hbs        # Folder item partial
│   ├── filemanager.hbs       # File manager view
│   └── imageEditor.hbs       # Image editor view
├── upload/                   # User-uploaded files directory
└── README.md                # This file
```

## Usage

### Uploading Files

1. Click the "Upload File" button
2. Select one or more files from your computer
3. Files appear in the current directory immediately

### Creating Folders

1. Click the "New Folder" button
2. Enter a folder name
3. Press Enter or click Create

### Navigating Directories

- Click on any folder to enter it
- Use the breadcrumb navigation to go back
- Click ".." to move to the parent directory

### Editing Images

1. Click on an image file
2. Select "Edit" to open the image editor
3. Use editing tools to modify the image
4. Save your changes

### Deleting Files

1. Hover over or select a file/folder
2. Click the delete icon
3. Confirm the deletion

## API Endpoints

The server provides REST endpoints for file operations:

- `GET /` - List files in current directory
- `GET /file/:filename` - Download a file
- `POST /upload` - Upload file(s)
- `POST /mkdir` - Create new directory
- `POST /delete` - Delete file or folder
- `POST /edit` - Edit and save image
- `GET /image/edit/:filename` - Open image editor

## Development Notes

- The file manager stores uploaded files in the `upload/` directory
- Jimp handles all image processing operations
- Handlebars templates provide dynamic HTML generation
- Express handles routing and middleware
- The application is single-user
