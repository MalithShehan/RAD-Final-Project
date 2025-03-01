CREATE DATABASE book_shop_management;
USE book_shop_management;

CREATE TABLE Customer (
                          id VARCHAR(255) PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          address VARCHAR(255) NOT NULL,
                          phone VARCHAR(15) NOT NULL
);

CREATE TABLE Item (
                      itemCode VARCHAR(255) PRIMARY KEY,
                      `desc` VARCHAR(255) NOT NULL,
                      author VARCHAR(255) NOT NULL,
                      qto INT NOT NULL,
                      price FLOAT NOT NULL
);

CREATE TABLE Orders (
                        orderId VARCHAR(255) PRIMARY KEY,
                        customerId VARCHAR(255) NOT NULL,
                        date VARCHAR(255) NOT NULL,
                        customerName VARCHAR(255) NOT NULL,
                        total FLOAT NOT NULL,
                        discount VARCHAR(255) NOT NULL,
                        subtotal FLOAT NOT NULL,
                        FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
);

CREATE TABLE OrderDetails (
                              orderId VARCHAR(255),
                              itemCode VARCHAR(255),
                              PRIMARY KEY (itemCode, orderId),
                              FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE,
                              FOREIGN KEY (itemCode) REFERENCES Item(itemCode) ON DELETE CASCADE
);

CREATE TABLE User (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) UNIQUE NOT NULL,
                      password VARCHAR(255) NOT NULL
);
