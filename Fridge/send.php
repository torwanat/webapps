<?php
    $rawInput = fopen('php://input', 'r');
    $tempStream = fopen('php://temp', 'r+');
    stream_copy_to_stream($rawInput, $tempStream);
    rewind($tempStream);
    $result = json_decode(stream_get_contents($tempStream), true);
    $link = new mysqli("localhost", "root", "", "fridge");
    // $query = "INSERT IGNORE INTO fridge_tab (boardId, activeNotes, allNotes, maxIndex, notes) VALUES("."'". $result["boardId"]. "', "."'". $result["active"]. "', "."'". $result["all"]. "', "."'". $result["maxIndex"]. "', "."'". json_encode($result["notes"]). "') "."ON DUPLICATE KEY UPDATE "."activeNotes='". $result["active"]. "', "."allNotes='". $result["all"]. "', "."maxIndex='". $result["maxIndex"]. "', "."notes='". json_encode($result["notes"]). "'";
    // $post = $link->query($query);
    $deleteQuery = "DELETE FROM fridge_tab WHERE boardId=?";
    // $delete = $link->query($deleteQuery);
    $stmt = mysqli_prepare($link, $deleteQuery);
    mysqli_stmt_bind_param($stmt, "s", $result['boardId']);
    mysqli_stmt_execute($stmt);
    $insertQuery = "INSERT INTO fridge_tab (boardId, activeNotes, allNotes, maxIndex, notes) VALUES("."?, "."'". $result["active"]. "', "."'". $result["all"]. "', "."'". $result["maxIndex"]. "', "."'". json_encode($result["notes"]). "')";
    // $insert = $link->query($insertQuery);
    $stmtInsert = mysqli_prepare($link, $insertQuery);
    mysqli_stmt_bind_param($stmtInsert, "s", $result['boardId']);
    mysqli_stmt_execute($stmtInsert);
?>