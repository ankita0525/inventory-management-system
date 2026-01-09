const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- Important: Configure your database connection here ---
const db = mysql.createConnection({
    host: 'localhost:3306',       // Your MySQL host (usually 'localhost')
    user: 'root',            // Your MySQL username
    password: 'sush1234',            // Your MySQL password (empty for default)
    database: 'inventory_system'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database.');
});

// API endpoint to get all categories for dropdown
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// API endpoint to get all brands for dropdown
app.get('/api/brands', (req, res) => {
    const sql = 'SELECT * FROM brands';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// API endpoint to get all stores/suppliers for dropdown
app.get('/api/stores', (req, res) => {
    const sql = 'SELECT * FROM stores';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// API endpoint to get all products with related data
app.get('/api/products', (req, res) => {
    const sql = `
        SELECT p.*, c.category_name, b.bname, s.sname 
        FROM product p
        LEFT JOIN categories c ON p.cid = c.cid
        LEFT JOIN brands b ON p.bid = b.bid
        LEFT JOIN stores s ON p.sid = s.sid
        ORDER BY p.added_date DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// API endpoint to add a new product
app.post('/api/products', (req, res) => {
    const { pname, p_stock, price, cid, bid, sid } = req.body;
    const added_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    const sql = 'INSERT INTO product (pname, p_stock, price, added_date, cid, bid, sid) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [pname, p_stock, price, added_date, cid, bid, sid];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Product added successfully!', productId: result.insertId });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
