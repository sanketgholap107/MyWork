<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Update</title>

    <style>
        
        body {
            padding: 50px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 50px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .alert {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 4px;
        }

        .alert-danger {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .alert-success {
           background-color: #d4edda;
           color: #155724;
           border: 1px solid #c3e6cb;
        }

        h3 {
            margin-bottom: 20px;
            color: #333;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            box-sizing: border-box;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }

        button:hover {
            background-color: #45a049;
        }

    </style>
</head>
<body>
     <?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once "database.php";

if(isset($_POST['updatepassword']))
{
    $password = $_POST['password'];
    
    // Password validation
    $errors = array();

    if (strlen($password) < 8 || !preg_match("/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).+$/", $password)) {
        array_push($errors, "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character");
    }

    if (count($errors) > 0) {
        foreach ($errors as $error) {
            echo "<div class='container'><div class='alert alert-danger'>$error</div></div>";
        }
    }else{

  $pass = password_hash($_POST['password'],PASSWORD_BCRYPT);
  $update = "UPDATE `users` SET `password`='$pass',`resetToken`=NULL,`resetTokenExpire`=NULL WHERE `email`='$_POST[email]'";
  if(mysqli_query($conn,$update)){
      // echo "Password updated successfully !";
      echo "
                  <div class='container'>
                      <div class='alert alert-success'>Password updated successfully!</div>
                  </div>
              ";
      // header("Location: login.php");
      header("refresh:2;url=login.php"); 
      exit();
  }else{
      // echo "server down!";
      echo "
                  <div class='container'>
                      <div class='alert'>Server down!</div>
                  </div>
              ";
  }
 }
}

if(isset($_GET['email']) && isset($_GET['reset_token'])) {
    date_default_timezone_set('Asia/Kolkata');
    $date = date("Y-m-d");
    $query = "SELECT * FROM `users` WHERE `email`='$_GET[email]' AND `resetToken`='$_GET[reset_token]' AND `resetTokenExpire`='$date'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) == 1) {

            echo "
                    <div class='container'>
                        <form method='POST'>
                            <h3>Create New Password</h3>
                            <input type='password' placeholder='New Password' name='password' required>
                            <button type='submit' name='updatepassword'>Update</button>
                            <input type='hidden' name='email' value='$_GET[email]'>
                        </form>
                    </div>
                ";
        } else {
            // echo "Invalid or expired link!";
            echo "
                    <div class='container'>
                        <div class='alert'>Invalid or expired link!</div>
                    </div>
                ";
        }
    } else {
        echo "Server down!";
    }
} 
?>


</body>
</html>
