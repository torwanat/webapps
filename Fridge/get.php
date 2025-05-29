<?php
    $requestedId = $_GET['boardId'];
    $link = new mysqli("localhost", "root", "", "fridge");
    $query = "select * from fridge_tab WHERE boardId='" .$requestedId. "' LIMIT 1;";
    $answer = $link->query($query);
    if ($answer->num_rows > 0) {
        while ($row = $answer->fetch_assoc()) {
            echo json_encode($row);
        }
    }else{
        echo "noIdFound";
    }
?>