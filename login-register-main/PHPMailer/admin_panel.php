<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container_table">
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <?php
                        require_once "database.php";
                        $sql = "SELECT id, first_name, last_name, email FROM users";
                        $result = mysqli_query($conn, $sql);
                        // $users = mysqli_fetch_array($result, MYSQLI_ASSOC);
                        while ($user = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            
                            echo "<tr>";
                            echo "<td>" . $user['first_name'] . "</td>";
                            echo "<td>" . $user['last_name'] . "</td>";
                            echo "<td>" . $user['email'] . "</td>";
                            echo "<td><form action='delete_user.php' method='post'><input type='hidden' name='user_id' value='" . $user['id'] . "'><input type='submit' value='Delete' class='delete_button'></form></td>";
                            echo "</tr>";
                        }  
                    ?>    
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>