<?php
require "headers.php";
require "config.php";

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit;
}

$rawInput = fopen('php://input', 'r');
$tempStream = fopen('php://temp', 'r+');
stream_copy_to_stream($rawInput, $tempStream);
rewind($tempStream);
$post_data = json_decode(stream_get_contents($tempStream), true);

$connection = new Config();
$result;

if ($post_data['id'] == -1) {
    $result = $connection->addBorrow($post_data['bookId'], $post_data['customerId'], $post_data['borrowedDate'], $post_data['returnDate']);
} else {
    $result = $connection->updateBorrow($post_data['bookId'], $post_data['customerId'], $post_data['borrowedDate'], $post_data['returnDate'], $post_data['id']);
}

$status = [
    "result" => "FAIL"
];

if ($result) {
    $status['result'] = "SUCCESS";
}

echo json_encode($status);