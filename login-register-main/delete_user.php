<?php
    require_once "database.php";

    $user_id = intval($_POST['user_id']);

    $stmt = $conn->prepare('DELETE FROM users WHERE id = ?');
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    header("Location: admin_panel.php");
    exit();
?>