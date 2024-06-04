<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Forgot Password</title>
</head>
<body>
    <form action="forgotPassword.php" method="post">
        <div class="container">  
            <div class="form-group">
                <input type="email" placeholder="Enter Email:" name="email" class="form-control">
            </div>

            <div class="form-btn">
                <input type="submit" value="send-link" name="send-link" class="btn btn-primary">
            </div>
            <div>
                <p>OR</p>
                <a href="login.php">Check Password By Loggin In</a>
            </div>
        </div>   
    </form>
</body>
</html>