<?php
function checkCookie() {
    global $conn;

    if(isset($_COOKIE['remember-me'])) {
        $token = $_COOKIE['remember-me'];
        $stmt = $conn->prepare("SELECT user_id FROM tokens WHERE token=?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->bind_result($user_id);
        $stmt->fetch();
        $stmt->close();

        if ($user_id) {
            $stmt2 = $conn->prepare("SELECT id, name, email FROM users WHERE id=?");
            $stmt2->bind_param("i", $user_id);
            $stmt2->execute();
            $stmt2->bind_result($id, $name, $email);
            $stmt2->fetch();
            $stmt2->close();
        
            $_SESSION['id'] = $id;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            unset($_SESSION['errors']);
            return true;
        }
        else {
            return false;
        }
    } else {
        return false;
    }
};