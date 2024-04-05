<?php

class Config
{
    private $databaseHost = 'localhost';
    private $databaseUsername = 'root';
    private $databasePassword = '';
    private $databaseName = 'bookstore';
    private $connection;

    function __construct()
    {
        $this->connection = mysqli_connect($this->databaseHost, $this->databaseUsername, $this->databasePassword, $this->databaseName);
    }

    function getBorrowed()
    {
        $response = $this->connection->query(
            "SELECT books.title, customers.name, customers.surname, borrowed.borrowed_date, borrowed.return_date, borrowed.id FROM `borrowed`
            JOIN `books` ON borrowed.book_id=books.id
            JOIN `customers` ON borrowed.customer_id=customers.id;"
        );
        $result = array();

        if ($response->num_rows > 0) {
            while ($row = $response->fetch_assoc()) {
                array_push($result, $row);
            }
        }

        return $result;
    }

    function deleteBorrow(int $id)
    {
        $query = $this->connection->prepare(
            "DELETE FROM `borrowed` WHERE id=?;"
        );
        $query->bind_param("i", $id);
        $result = $query->execute();
        return $result;
    }

    function getBooks()
    {
        $response = $this->connection->query(
            "SELECT id, title FROM `books` WHERE available>0;"
        );
        $result = array();

        if ($response->num_rows > 0) {
            while ($row = $response->fetch_assoc()) {
                array_push($result, $row);
            }
        }

        return $result;
    }

    function getCustomers()
    {
        $response = $this->connection->query(
            "SELECT id, name, surname FROM `customers`;"
        );
        $result = array();

        if ($response->num_rows > 0) {
            while ($row = $response->fetch_assoc()) {
                array_push($result, $row);
            }
        }

        return $result;
    }

    function addBorrow(int $book_id, int $customer_id, string $borrowed_date, string $return_date)
    {
        $query = $this->connection->prepare(
            "INSERT INTO `borrowed` (book_id, customer_id, borrowed_date, return_date) VALUES(?, ?, ?, ?)"
        );
        $query->bind_param("iiss", $book_id, $customer_id, $borrowed_date, $return_date);
        $result = $query->execute();
        return $result;
    }

    function updateBorrow(int $book_id, int $customer_id, string $borrowed_date, string $return_date, int $id)
    {
        $query = $this->connection->prepare(
            "UPDATE `borrowed` SET book_id=?, customer_id=?, borrowed_date=?, return_date=? WHERE id=?"
        );
        $query->bind_param("iissi", $book_id, $customer_id, $borrowed_date, $return_date, $id);
        $result = $query->execute();
        return $result;
    }
}
