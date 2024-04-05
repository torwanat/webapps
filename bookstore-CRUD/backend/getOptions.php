<?php
require "headers.php";
require "config.php";

$connection = new Config();
$books = $connection->getBooks();
$customers = $connection->getCustomers();

$result = [
    "books" => $books,
    "customers" => $customers
];

echo json_encode($result);