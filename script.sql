CREATE DATABASE IF NOT EXISTS music_db;

USE music_db;

CREATE TABLE Artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    numberOfMembers INT,
    style VARCHAR(100)
);
INSERT INTO Artist (name, country, numberOfMembers, style)
VALUES 
    ('Coldplay', 'United Kingdom', 4, 'Alternative Rock'),
    ('Adele', 'United Kingdom', 1, 'Pop Soul'),
    ('BTS', 'South Korea', 7, 'K-Pop'),
    ('Taylor Swift', 'United States', 1, 'Pop'),
    ('Linkin Park', 'United States', 6, 'Nu Metal');
