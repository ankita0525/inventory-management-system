const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('./public'));

// Create SQLite database connection
const db = new sqlite3.Database('./database/inventory.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    }
    console.log('Successfully connected to SQLite database.');
});

// Initialize database tables
const initializeDatabase = () => {
    // Create categories table
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        cid INTEGER PRIMARY KEY,
        category_name TEXT
    )`, (err) => {
        if (err) console.error('Error creating categories table:', err);
    });

    // Create brands table
    db.run(`CREATE TABLE IF NOT EXISTS brands (
        bid INTEGER PRIMARY KEY,
        bname TEXT
    )`, (err) => {
        if (err) console.error('Error creating brands table:', err);
    });

    // Create stores table
    db.run(`CREATE TABLE IF NOT EXISTS stores (
        sid INTEGER PRIMARY KEY,
        sname TEXT,
        address TEXT,
        mobno TEXT
    )`, (err) => {
        if (err) console.error('Error creating stores table:', err);
    });

    // Create product table
    db.run(`CREATE TABLE IF NOT EXISTS product (
        pid INTEGER PRIMARY KEY AUTOINCREMENT,
        pname TEXT,
        p_stock INTEGER,
        price REAL,
        added_date TEXT,
        cid INTEGER,
        bid INTEGER,
        sid INTEGER,
        FOREIGN KEY (cid) REFERENCES categories(cid),
        FOREIGN KEY (bid) REFERENCES brands(bid),
        FOREIGN KEY (sid) REFERENCES stores(sid)
    )`, (err) => {
        if (err) console.error('Error creating product table:', err);
    });

    // Insert sample data with delay to ensure tables are created
    setTimeout(() => {
        db.run(`INSERT OR IGNORE INTO categories (cid, category_name) VALUES
            (1, 'Electronics'),
            (2, 'Clothing'),
            (3, 'Grocery')`, (err) => {
            if (err) console.error('Error inserting categories:', err);
        });

        db.run(`INSERT OR IGNORE INTO brands (bid, bname) VALUES
            (1, 'Apple'),
            (2, 'Samsung'),
            (3, 'Nike'),
            (4, 'Fortune')`, (err) => {
            if (err) console.error('Error inserting brands:', err);
        });

        db.run(`INSERT OR IGNORE INTO stores (sid, sname, address, mobno) VALUES
            (1, 'Ram Kumar', 'Katpadi vellore', '9999999999'),
            (2, 'Rakesh Kumar', 'Chennai', '8888555541'),
            (3, 'Suraj', 'Haryana', '7777555541')`, (err) => {
            if (err) console.error('Error inserting stores:', err);
        });
    }, 100);
};

// Initialize database
initializeDatabase();

// API endpoint to get all categories for dropdown
app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

// API endpoint to get all brands for dropdown
app.get('/api/brands', (req, res) => {
    db.all('SELECT * FROM brands', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});

// API endpoint to get all stores/suppliers for dropdown
app.get('/api/stores', (req, res) => {
    db.all('SELECT * FROM stores', (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
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
    
    db.all(sql, (err, rows) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(rows);
    });
});

// API endpoint to add a new product
app.post('/api/products', (req, res) => {
    const { pname, p_stock, price, cid, bid, sid } = req.body;
    const added_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    const sql = 'INSERT INTO product (pname, p_stock, price, added_date, cid, bid, sid) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [pname, p_stock, price, added_date, cid, bid, sid];

    db.run(sql, values, function(err) {
        if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Product added successfully!', productId: this.lastID });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
