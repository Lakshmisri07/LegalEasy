-- Run these in MySQL before starting the server
CREATE DATABASE IF NOT EXISTS legaleasy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE legaleasy;

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content MEDIUMTEXT,
  tags VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional seed data
INSERT INTO documents (title, content, tags) VALUES
('NDA Template', 'A simple non-disclosure agreement...', 'nda,template'),
('Service Agreement', 'Terms for service provision...', 'agreement,service');
