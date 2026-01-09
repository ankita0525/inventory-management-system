CREATE DATABASE IF NOT EXISTS inventory_system;

USE inventory_system;

CREATE TABLE categories (
    cid INT(5) PRIMARY KEY,
    category_name VARCHAR(20)
);

CREATE TABLE brands (
    bid INT(5) PRIMARY KEY,
    bname VARCHAR(20)
);

CREATE TABLE stores (
    sid INT(5) PRIMARY KEY,
    sname VARCHAR(20),
    address VARCHAR(20),
    mobno VARCHAR(15)
);

CREATE TABLE product (
    pid INT(5) PRIMARY KEY AUTO_INCREMENT,
    pname VARCHAR(20),
    p_stock INT(5),
    price DECIMAL(10, 2),
    added_date DATE,
    cid INT(5),
    bid INT(5),
    sid INT(5),
    FOREIGN KEY (cid) REFERENCES categories(cid),
    FOREIGN KEY (bid) REFERENCES brands(bid),
    FOREIGN KEY (sid) REFERENCES stores(sid)
);

INSERT INTO categories (cid, category_name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Grocery');

INSERT INTO brands (bid, bname) VALUES
(1, 'Apple'),
(2, 'Samsung'),
(3, 'Nike'),
(4, 'Fortune');

INSERT INTO stores (sid, sname, address, mobno) VALUES
(1, 'Ram Kumar', 'Katpadi vellore', '9999999999'),
(2, 'Rakesh Kumar', 'Chennai', '8888555541'),
(3, 'Suraj', 'Haryana', '7777555541');
