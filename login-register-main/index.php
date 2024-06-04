<?php
session_start();
?>  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>User Dashboard</title>
</head>
<body>

    <div class="topnav" style="align-items:center; display: flex; justify-content: space-between; background-color: #333; color:white;">
        <?php
        if (!isset($_SESSION["user"])) {
            echo "<img src='logo.png' alt='Logo' style='margin-left:20px;' height='5%;' width='5%;' >";
            echo "<div><a href=\"registration.php\" class=\"btn btn-warning\" style='margin-right:5px; text-decoration:none'>Sign Up</a><a href=\"login.php\" class=\"btn btn-warning\"style='margin-right:5px; text-decoration:none'>Login</a></div>";  
            
        }
        ?>
        <?php
            if(isset($_SESSION["user"])){
                echo "<img src='logo.png' alt='Logo' style='margin-left:20px;' height='5%;' width='5%;' >"; 
                echo "<h3 style='margin-right:50px;'>Welcome $_SESSION[username] !</h3>";
            }
        ?>
    </div>
    <br>
    <div class="container">
       <?php 
            
            if(isset($_SESSION['user'])){
                error_log(print_r($_SESSION,1));
                $username = $_SESSION['username'];
                $plainPassword = $_SESSION['plain_password'];
                echo "<p>Your Password is:  <b>".htmlspecialchars($plainPassword)."</b><p>";
            } else {
                echo "<h1 style='text-align:center;'>Welcome To Login System</h1>";
            }
       ?>
       <br>
       <br>    
        <?php

            if (isset($_SESSION["user"])) {
                echo "<a href=\"logout.php\" class=\"btn btn-warning\">Logout</a>"; 
            }
        ?>
    </div>
</body>
</html>