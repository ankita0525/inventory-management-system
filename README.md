# 📦 Inventory Management System

A modern, full-stack web application for managing business inventory with real-time tracking, search functionality, and responsive design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
http://localhost:3000
```

## 📁 Project Structure

```
Inventory_management_system/
├── 📁 src/                    # Source code
│   ├── server-sqlite.js       # Main server file
│   └── server.js              # MySQL version (alternative)
├── 📁 public/                 # Frontend files
│   ├── index.html             # Main HTML page
│   ├── style.css              # Styling
│   └── script.js              # Frontend logic
├── 📁 database/               # Database files
│   ├── inventory.db           # SQLite database
│   └── setup.sql              # MySQL schema (reference)
├── 📁 docs/                   # Documentation
│   ├── PROJECT_REPORT.md      # Complete project report
│   ├── TECHNICAL_DOCUMENTATION.md # Technical details
│   └── PROJECT_SUMMARY.md     # Project summary
├── 📁 scripts/                # Utility scripts
│   └── setup.js               # Project setup script
├── package.json               # Project configuration
└── README.md                  # This file
```

## ✨ Features

- 🎯 **Product Management** - Add, view, and manage inventory
- 🔍 **Real-time Search** - Instant product search and filtering
- 📱 **Responsive Design** - Works on all devices
- 📊 **Category Organization** - Organize by categories, brands, suppliers
- 💾 **Data Persistence** - SQLite database for reliable storage
- 🎨 **Modern UI** - Beautiful, professional interface

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite
- **Package Manager**: npm

## 📚 Documentation

- [📋 Complete Project Report](docs/PROJECT_REPORT.md)
- [🔧 Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)
- [📊 Project Summary](docs/PROJECT_SUMMARY.md)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0 or higher)
- npm package manager

### Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   ```
4. **Open your browser:**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run setup` - Run project setup verification

## 🎯 Usage

1. **Introduction Tab** - Overview of system features
2. **Add Product Tab** - Add new products to inventory
3. **Show Info Tab** - View, search, and filter all products

## 🔧 Configuration

The system uses SQLite database which is automatically created. No additional configuration is required.

For MySQL version, update the database credentials in `src/server.js`:
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'inventory_system'
});
```

## 📈 Future Enhancements

- User authentication system
- Barcode/QR code integration
- Low stock alerts
- Export functionality (PDF/Excel)
- Multi-location support
- Advanced analytics dashboard

## 🤝 Contributing

This is an academic project demonstrating full-stack web development practices.

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🎓 Educational Value

This project demonstrates:
- Modern web development practices
- Database design and management
- RESTful API development
- Responsive UI/UX design
- Error handling and validation
- Project organization and documentation

---

**Project Status**: ✅ Complete and Functional  
**Last Updated**: October 2024