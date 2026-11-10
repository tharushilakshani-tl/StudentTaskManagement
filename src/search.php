<?php
// search.php
header('Content-Type: application/json; charset=utf-8');

// Database credentials
$host = 'localhost';
$dbname = 'library_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Get the search query from GET parameter
$query = isset($_GET['query']) ? trim($_GET['query']) : '';

if ($query === '') {
    // If empty query, return an empty list or top books
    echo json_encode([]);
    exit;
}

// Search books by title or author
$sql = "SELECT id, title, author, category, available 
        FROM books 
        WHERE title LIKE :search OR author LIKE :search 
        LIMIT 20";

$stmt = $pdo->prepare($sql);
$searchTerm = "%" . $query . "%";
$stmt->bindParam(':search', $searchTerm, PDO::PARAM_STR);
$stmt->execute();

$results = $stmt->fetchAll();

echo json_encode($results);
?>