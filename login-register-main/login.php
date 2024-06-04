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
            if (isset($_POST["login"])) {
            $email = $_POST["email"];
            $password = $_POST["password"];
                require_once "database.php";
                
                if(strpos($email,'@')!==false){
                    $sql = "SELECT * FROM users WHERE email = '$email'";    
                }else{
                    $sql = "SELECT * FROM users WHERE full_name = '$email'";
                }
                // $sql = "SELECT * FROM users WHERE email = '$email'";
                $result = mysqli_query($conn, $sql);
                $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
                error_log(print_r($user,1));
                if ($user) {
                    if (password_verify($password, $user["password"])) {
                        session_start();
                        $_SESSION["user"] = "yes";
                        $_SESSION["username"] = $user['full_name'];
                        $_SESSION["plain_password"] = $password;
                        header("Location: index.php");
                        die();

                    }else{
                        echo "<div class='alert alert-danger'>Password does not match</div>";
                    }
                }else{
                    echo "<div class='alert alert-danger'>Email does not match</div>";
                }
            }
            ?>
        <form action="login.php" method="post">
            <div class="form-group">
                <input type="text" placeholder="Enter Email / UserName" name="email" class="form-control">
            </div>
            <div class="form-group">
                <input type="password" placeholder="Enter Password" name="password" class="form-control">
            </div>
            <div class="form-btn">
                <input type="submit" value="Login" name="login" class="btn btn-primary">
            </div>
        </form>
        <div><p>Forgot Password <a href="forgot_password.php">click Here</a></p></div>
        <div><p>Not registered yet <a href="registration.php">Register Here</a></p></div>
        <div><p>Admin Login <a href="admin_login.php">Click Here</a></p></div>
    </div>
</body>
</html>