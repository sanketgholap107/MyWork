<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: index.php");
}
?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-sca  le=1.0">
    <title>Login Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
            <?php
            if (isset($_POST["submit"])) {
            $email = $_POST["email"];
            $secret_id = $_POST["secretId"];
            error_log($secret_id);
                require_once "database.php";
                
                if(strpos($email,'@')!==false){
                    $sql = "SELECT * FROM admin_details WHERE username = '$email'";    
                }else{
                    $sql = "SELECT * FROM admin_details WHERE username = '$email'";
                }
                // $sql = "SELECT * FROM users WHERE email = '$email'";
                $result = mysqli_query($conn, $sql);
                $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
                error_log(print_r($user,1));
                if ($user) {
                    if ($secret_id == $user['secret_id']) {

                        echo "<div class='alert-success'>Your Password is :". $user['password'] ."</div>";

                    }else{
                        echo "<div class='alert alert-danger'>Secret ID does not match</div>";
                    }
                }else{
                    echo "<div class='alert alert-danger'>Username does not match</div>";
                }
            }
            ?>
        <form action="admin_forgot_password.php" method="post">
            <div class="form-group">
                <input type="text" placeholder="UserName" name="email" class="form-control">
            </div>
            <div class="form-group">
                <input type="password" placeholder="Enter Secret Id" name="secretId" class="form-control">
            </div>
            <div class="form-btn">
                <input type="submit" value="submit" name="submit" class="btn btn-primary">
            </div>
        </form>
    </div>
</body>
</html>