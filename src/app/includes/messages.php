<?php
if(isset($_SESSION['success'])) {
    foreach($_SESSION['success'] as $message) {
        echo('
        <script>
        Toastify({
            text: "' . $message . '",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #65B15E, #27A31C)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        </script>
        ');
    }
    $_SESSION['success'] = [];
}

if(isset($_SESSION['errors'])) {
    foreach($_SESSION['errors'] as $message) {
        echo('
        <script>
        Toastify({
            text: "' . $message . '",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #FC6D6D, #FC4646)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        </script>
        ');
    }
    $_SESSION['errors'] = [];
}
?>