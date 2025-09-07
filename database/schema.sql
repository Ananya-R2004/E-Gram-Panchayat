USE egram_panchayat_db;

CREATE TABLE pre_loaded_admins (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     official_id VARCHAR(50) NOT NULL UNIQUE,
    ->     full_name VARCHAR(100) NOT NULL,
    ->     mobile_number VARCHAR(15) NOT NULL,
    ->     is_registered BOOLEAN DEFAULT FALSE
    -> );

 CREATE TABLE users (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     username VARCHAR(255) NOT NULL UNIQUE,
    ->     password VARCHAR(255) NOT NULL,
    ->     user_type ENUM('citizen', 'admin') NOT NULL
    -> );

 CREATE TABLE otp_store (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     mobile_number VARCHAR(15) NOT NULL,
    ->     otp VARCHAR(10) NOT NULL,
    ->     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ->     is_used BOOLEAN DEFAULT FALSE
    -> );
INSERT INTO pre_loaded_admins (official_id, full_name, mobile_number)
    -> VALUES ('GP_ADMIN_001', 'Rajesh Kumar', '1111111111');
INSERT INTO pre_loaded_admins (official_id, full_name, mobile_number)
    -> VALUES ('GP_ADMIN_002', 'Priya Sharma', '2222222222');
INSERT INTO pre_loaded_admins (official_id, full_name, mobile_number)
    -> VALUES ('GP_ADMIN_003', 'Ankit Verma', '3333333333');




-- Tables were created with the following structure:
-- pre_loaded_admins: Stores admin accounts before registration
-- users: Stores login credentials (populated by backend)
-- otp_store: Manages temporary OTP codes

-- Pre-loaded admins inserted:
-- GP_ADMIN_001, Rajesh Kumar, 1111111111
-- GP_ADMIN_002, Priya Sharma, 2222222222  
-- GP_ADMIN_003, Ankit Verma, 3333333333
