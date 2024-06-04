<?php
  require_once "database.php";

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  function sendMail($email,$reset_token){
    require('PHPMailer/src/PHPMailer.php');
    require('PHPMailer/src/SMTP.php');
    require('PHPMailer/src/Exception.php');

    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'sanketgholap107@gmail.com';                     //SMTP username
        $mail->Password   = 'ehrakfaaqjsandvf';                               //SMTP password
        $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('sanketgholap107@gmail.com', 'Sanket');
        $mail->addAddress($email);     //Add a recipient
        
    
        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Password link set from Sanket';
        $mail->Body    = "we got a request from you to reset your password! <br>
                        Click the link below: <br>
                        <a href='http://localhost/login-register-main/PHPMailer/updatepassword.php?email=$email&reset_token=$reset_token'>Reset Password</a>";
        // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        // echo 'Message has been sent';
        return true;
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return false;
    }

  }

  if(isset($_POST['send-link']))
  {
    $query = "SELECT * FROM users WHERE email = '$_POST[email]'";
    $result = mysqli_query($conn,$query);
    if($result)
    {
        if(mysqli_num_rows($result) == 1)
        {
          //email found  
          $reset_token =bin2hex(random_bytes(16));
          date_default_timezone_set('Asia/kolkata');
          $date = date("Y-m-d");
          $query = "UPDATE `users` SET `resetToken`='$reset_token',`resetTokenExpire`='$date' WHERE email = '$_POST[email]'";
        
          if(mysqli_query($conn,$query)&& sendMail($_POST['email'],$reset_token))
          {
            echo "<h3>Password reset link sent to mail</h3>";
          }else{
            echo "Herre";

          }
        }else{
            echo "Invalid email";
        }
    }
    else
    {
        echo "cannot run";
    }
  }
?>