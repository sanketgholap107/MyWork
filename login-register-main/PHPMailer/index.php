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
    <div class="container">
    <?php
if (!isset($_SESSION["user"])) {
    echo "<a href=\"registration.php\" class=\"btn btn-warning\">Sign Up</a>";  
    echo "<a href=\"login.php\" class=\"btn btn-warning\">Login</a>";  
}
?>
        <h1>Roaming Heights: A Trekker's Diary</h1>
       <p> <h3>Venture into the great unknown, where each step is a dance with nature's rhythm.
Trekking is not just a journey through landscapes; it's an odyssey within oneself.
The trail whispers tales of ancient adventures, as if the very earth is a storyteller.
With every ascent, you leave behind the mundane and embrace the extraordinary.
Trekking is a dialogue between the soul and the mountains, where silence speaks volumes.</h3></p>
        <?php
if (isset($_SESSION["user"])) {
    echo "<h1>Nature's Walk: A Journey of Simple Joys</h1><br/><p><h3>In the wilderness, your footprints become a testament to your resilience and determination.
    The summit is not just a destination; it's a vantage point to witness the world from a new perspective.
    Nature's classroom, where the lessons are written in the rustle of leaves and the murmur of streams.
    Each trail is a brushstroke on the canvas of memory, creating a masterpiece of experiences.
    Trekking is the art of finding solace in the midst of nature's grandeur, a journey that unveils the true essence of freedom.</h3></p>";
}

   if (isset($_SESSION["user"])) {
    echo "<a href=\"logout.php\" class=\"btn btn-warning\">Logout</a>"; 
}
?>
    </div>
</body>
</html>