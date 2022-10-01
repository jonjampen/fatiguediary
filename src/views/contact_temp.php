<?php
print_head(array('<title>Contact | Fatigue Diary</title>'), false);
if (isset($_SESSION['id'])) {
    print_body();
} else {
    print_body_top_nav_only();
}
includeToastify();
$todayDate = date("Y-m-d");

?>    
    <div class="container">
        <h2 class="container-title">Kontakt</h2>
        <div class="contact-content">
            <img src="assets/img/contact.svg" alt="">
            <div class="info">
                <div class="icon-text">
                    <span class="material-icons">person</span><p>Jon Jampen</p>
                </div>
                <div class="icon-text">
                    <span class="material-icons">alternate_email</span><a href="mailto:info@fatiguediary.ch">info@fatiguediary.ch</a>
                </div>
                <div class="icon-text">
                    <span class="material-icons">description</span><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=DCCUVtJEV0S5DB3Mns57N9z31UTFmhlKvEhurtMhXK1UMkFWNE9DWDQzNk5LMENaVzlCSkVGWTlWQy4u">Feedback Form</a>
                </div>
            </div>
        </div>
        

    
    </div>
