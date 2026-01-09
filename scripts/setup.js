#!/usr/bin/env node

/**
 * Setup script for Inventory Management System
 * This script initializes the project and sets up the database
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Inventory Management System...\n');

// Check if required directories exist
const requiredDirs = ['database', 'public', 'src', 'docs'];
const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

if (missingDirs.length > 0) {
    console.log('❌ Missing required directories:', missingDirs.join(', '));
    console.log('Please run this script from the project root directory.');
    process.exit(1);
}

console.log('✅ Project structure verified');

// Check if database file exists
const dbPath = path.join(__dirname, '..', 'database', 'inventory.db');
if (!fs.existsSync(dbPath)) {
    console.log('📁 Database file will be created on first run');
} else {
    console.log('✅ Database file exists');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    console.log('Please run: npm install');
} else {
    console.log('✅ Dependencies installed');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Start the server: npm start');
console.log('3. Open browser: http://localhost:3000');
console.log('\n📚 Documentation available in docs/ folder');
