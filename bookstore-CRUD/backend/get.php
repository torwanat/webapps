<?php
require "headers.php";
require "config.php";

$connection = new Config();
$borrowed = $connection->getBorrowed();

echo json_encode($borrowed);