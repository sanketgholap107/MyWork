<?php

$hostName = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "login_register";
$conn = mysqli_connect($hostName, $dbUser, $dbPassword, $dbName);
if (!$conn) {
    die("Something went wrong;");
}

$createUsersTable = "
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    resetToken INT(11) DEFAULT NULL,
    resetTokenExpire INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $createUsersTable)) {
    // echo "Table 'users' created successfully.<br>";
} else {
    echo "Error creating 'users' table: " . mysqli_error($conn) . "<br>";
}

// SQL to create 'admin_details' table
$createAdminDetailsTable = "
CREATE TABLE IF NOT EXISTS admin_details (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    secret_id INT(11) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$insertAdminQuery = "INSERT INTO admin_details (id, username, password, secret_id) VALUES (1, 'admin', 'admin123', 1122) ON DUPLICATE KEY UPDATE
username = VALUES(username),
password = VALUES(password),
secret_id = VALUES(secret_id)";
mysqli_query($conn, $insertAdminQuery);

if (mysqli_query($conn, $createAdminDetailsTable)) {
    // echo "Table 'admin_details' created successfully.<br>";
} else {
    echo "Error creating 'admin_details' table: " . mysqli_error($conn) . "<br>";
}

// mysqli_close($conn);

?>