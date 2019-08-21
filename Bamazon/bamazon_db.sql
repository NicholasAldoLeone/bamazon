DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item VARCHAR(20) NULL,
    category VARCHAR(20) NULL,
    price INT NULL,
    total_stock INT NULL,
    PRIMARY KEY(id)

);

INSERT INTO products (item, category, price, total_stock)
VALUES ("Lamp", "Furniture", 20, 100);

INSERT INTO products (item, category, price, total_stock)
VALUES ("Bed", "Furniture", 150, 40);

INSERT INTO products (item, category, price, total_stock)
VALUES ("Chair", "Furniture", 80, 60);

INSERT INTO products (item, category, price, total_stock)
VALUES ("Grill", "Furniture", 200, 20);

INSERT INTO products (item, category, price, total_stock)
VALUES ("Crusader Armor", "Protection", 1000, 5);