<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debugging statement
    echo "POST request received.<br>";

    // Database connection settings
    $servername = "localhost";
    $username = "root";  // Replace with your database username
    $password = "Mwende#2001!";      // Replace with your database password
    $dbname = "glucocorp";  // Replace with your database name

    try {
        // Connect to the database
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retrieve and sanitize email input
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

        // Validate email format
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Prepare SQL statement for insertion
            $stmt = $conn->prepare("INSERT INTO waitlist (email) VALUES (:email)");
            $stmt->bindParam(':email', $email);

            // Execute the SQL statement
            if ($stmt->execute()) {
                echo "Email successfully added to the waitlist!";
            } else {
                echo "Error inserting email.";
            }
        } else {
            echo "Invalid email format.";
        }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    } catch (Exception $e) {
        echo "An error occurred: " . $e->getMessage();
    }
} else {
    // Debugging statement
    echo "Request method is not POST.";
}
?>
