<?php
session_start();
if (isset($_SESSION["user"])) {
   header("Location: admin_panel.php");
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
           error_log("Password Entered:".$password);
            require_once "database.php";
            if(strpos($email,'@')!==false){
                $sql = "SELECT * FROM admin_details WHERE email = '$email'";    
            }else{
                $sql = "SELECT * FROM admin_details WHERE username = '$email'";
            }
            // $sql = "SELECT * FROM users WHERE email = '$email'";
            $result = mysqli_query($conn, $sql);
            $user = mysqli_fetch_array($result, MYSQLI_ASSOC);
            error_log("user password:".print_r($user,1));
            // error_log($user['password']);
            if ($user) {
                if ($password == $user["password"]) {
                    session_start();
                    $_SESSION["user"] = "yes";
                    $_SESSION["username"] = $user['username'];
                    header("Location: admin_panel.php");
                    die();

                }else{
                    echo "<div class='alert alert-danger'>Password does not match</div>";
                }
            }else{
                echo "<div class='alert alert-danger'>Username does not match</div>";
            }
        }
        ?>
      <form action="admin_login.php" method="post">
        <h3>Admin Login</h3>
        <div class="form-group">
            <input type="text" placeholder="UserName" name="email" class="form-control">
        </div>
        <div class="form-group">
            <input type="password" placeholder="Enter Password" name="password" class="form-control">
        </div>
        <div class="form-btn">
            <input type="submit" value="Login" name="login" class="btn btn-primary">
        </div>
      </form>
    <div><p>Forgot Password <a href="forgot_password.php">click Here</a></p></div>
</div>
</body>
</html>