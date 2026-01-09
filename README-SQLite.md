# Inventory Management System (SQLite Version)

This is a web-based inventory management system that provides functionality for adding new products using SQLite database.

## Features

- ✅ Add new product
- ✅ Dropdown for categories, brands and stores
- ✅ View all products in a table
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ SQLite database (no MySQL required)
- ✅ English language support

## Setup Instructions

### 1. Install Node.js
1. Download Node.js from https://nodejs.org
2. Install the LTS version
3. Make sure "Add to PATH" is checked during installation

### 2. Install Dependencies

```bash
# Copy the SQLite package.json
copy package-sqlite.json package.json

# Install dependencies
npm install
```

### 3. Running the Server

```bash
# Start the server
npm start
```

Or for development mode:

```bash
npm run dev
```

### 4. Opening the Web Page

Open the `index.html` file in your browser or visit `http://localhost:3000`.

## File Structure

```
inventory_management_system/
├── server-sqlite.js       # SQLite version of server
├── package-sqlite.json    # SQLite dependencies
├── index.html             # Main HTML page
├── style.css              # CSS styling
├── script.js              # JavaScript logic
├── inventory.db           # SQLite database (auto-created)
└── README-SQLite.md       # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite (file-based, no server required)
- **Styling**: Custom CSS with gradients and animations

## API Endpoints

- `GET /api/categories` - Get all categories
- `GET /api/brands` - Get all brands  
- `GET /api/stores` - Get all stores
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product

## Advantages of SQLite Version

- ✅ No MySQL installation required
- ✅ No password configuration needed
- ✅ Database file is created automatically
- ✅ Portable - just copy the folder
- ✅ No server setup required
- ✅ Perfect for development and testing

## Troubleshooting

1. **Node.js not found**: Make sure Node.js is installed and PATH is set correctly
2. **Port error**: Ensure port 3000 is available
3. **Database error**: The SQLite database file will be created automatically

## License

MIT License


