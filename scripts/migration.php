<?php

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// connecting to the database
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$password = $_ENV['DB_PASSWORD'];
$port = $_ENV['DB_PORT'];
$username =  $_ENV['DB_USERNAME'];

try {
  $conn = new PDO("pgsql:host=$host;dbname=$dbname;port=$port", $username, $password);
  // set PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$create_tickets_table = "CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    -- this line says that a status can only be 'open' or 'closed'
    status VARCHAR(20) CHECK (status IN ('open', 'closed')) NOT NULL default 'open',
    assigned_to VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$stmt = $conn->prepare($create_tickets_table);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($result);
$conn = null;

exit(0);
