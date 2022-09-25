<?php

$text =
[
    'd_title' => 'Your Dashboard',
    
    'day' => 'day',
    'week' => 'week',
    'month' => 'month',
    'year' => 'year',

    'energy' => 'energy',

    'good-activities' => 'Energy boosting activities',
    'bad-activities' => 'Energy draining activities',


    'add-add' => 'Add Entry',
    'add-edit' => 'Edit Entry',

    'energylevel' => 'Energy level',
    'activities' => 'Activities',
    'activity-desc' => 'Mark the activities that you have just done',

    'save-edit' => 'Save Changes',
    'add' => 'Add',
    
    'add-activity' => 'Create new activity',
    'enter-activity' => 'Activity name',
    'cancel' => 'Cancel',
    'notes' => 'Notes',


    'all-title' => 'Entries (last 7 days)',


    'dnf' => 'No Data Available',


    'settings' => 'Settings',
    'mode' => 'Theme',
    'dark' => 'Dark',
    'light' => 'Light',

    'awake-time' => 'Awake Time',

    'information-mail' => 'Information via e-mail:',

    'save' => 'Save',


    'login' => 'Log In',
    'email' => 'Email',
    'enter-email' => 'Enter email address...',
    'password' => 'Password',
    'enter-password' => 'Enter password...',
    'remember-me' => 'Stay logged in',

    'forgot-password' => 'Forgot your password?',
    'no-account' => 'Not yet signed up? ',
    'register-now' => 'Sign up now',

    'signup' => 'Sign up',
    'name' => 'Name',
    'enter-name' => 'Enter name...',
    'repeat-pw' => 'Repeat password',
    'enter-repeat-pw' => 'Reenter password...',

    'already-registered' => 'Already have an account? ',
    'login-now' => 'Log In now',

    'reset-pw' => 'Reset password',
    'change-pw' => 'Change password',
    'new-pw' => 'New password',
    'enter-new-pw' => 'Enter new password...',

    'dnf-page' => 'This page does not yet exist.',


    'entry-added' => 'Entry added successfully.',
    'entry-deleted' => 'Entry deleted.',
    'changes-saved' => 'Changes have been saved.',
    'register-success' => 'You have signed up successfully.',
    'login-success' => 'You have logged in successfully.',
    'email-success' => 'Email has been sent.',

    'empty-pw' => 'Password can not be empty.',
    'not-match' => 'Passwords do not match.',
    'empty-name' => 'Name can not be empty.',
    'invalid-name' => "Name is not valid (can only contain letters, '-' and spaces).",
    'empty-email' => 'Email can not be empty.',
    'invalid-email' => 'Email is not valid.',
    'used-email' => 'Email is already in use',
    'empty-password' => 'Password can not be empty.',
    'em-pw-wrong' => 'Email or password wrong.',

    'subject-reset-pw' => 'Reset Password - Fatigue Diary',
    'hello' => 'Hallo',
    'content-reset-pw' => 'Click on the link to reset your password: ',

    'whats-new' => 'What\'s new?',
    'how-it-works' => 'How it works',
    'contact' => 'Contact',
    'logout' => 'Logout',
    'start-tutorial' => 'Start tutorial',


    'welcome' => 'Welcome',
    'thank-you-register' => 'Thank you for registering!',
    'language-question' => 'Choose your language.',
    'light-or-dark' => 'Do you prefer light or dark theme?',
    'awake-question' => 'When are you normally awake?',
    'awake-desc' => 'This information is used to better display your charts.',
    'next' => 'Next',
    'news' => 'News',
    'news-question' => 'Would you like to be notified about news?',
    'receive-mail' => 'I\'d like to receive news.',
    'tutorial-desc' => 'You can repeat this tutorial at any time by going to "Start tutorial" in the side menu.',
    'start' => 'Start',
    'language' => 'Language',

    'all-entries' => 'All Entries',



    'info-title' => 'A Web app that helps you with your fatigue.',
    'info-description' => 'If you are suffering from chronic fatigue (ME/CFS, long COVID) this app can help you with managing your energy.',
    'info-btn' => 'Start now',
    'to-the-app' => 'Open the App',
    'screenshots' => 'Screenshots',
    'features' => 'Features',
    'track-activities' => 'Track Activities',
    'track-desc' => 'Create entries with your energy level after every activity. This can help you a lot with pacing.',
    'pacing' => 'Pacing',
    'pacing-desc' => 'Pacing is extremely important. Learn to know your body better and realize, when you need to take a break. Fatigue Diary can help you with this.',
    'analysis' => 'Analysis',
    'analysis-desc' => 'All the data you enter is analyzed and visualized in different charts. <br>Compare days, weeks, or months and see what activities make your fatigue worse.',
    'about-title' => 'Developed by a fatigue patient',
    'about-desc' => 'Hi, I\'m Jon Jampen. I am suffering from chronic fatigue myself and I have built this web app to show others what is helping me. This app is my matura project.',
    'copy' => 'All rights reserved. Designed and developed by Jon Jampen.',


    'how-fd-text' => 'Fatigue Diary works in your Browser or can be installed <a href="index.php?page=install">here</a>. A detailed tutorial on how to use Fatigue Diary is available <a href="intro/' . $_SESSION['settings']['language'] . '/Dashboard.php">here</a>. <br> Fatigue Diary can be used as a diary for patients with Fatigue and can help them with pacing. <br> Enter your energy level after every activity and the app will create a chart that displays your energy throughout the day. Other charts help you to compare days or months with each other. <br> This app was created by Jon Jampen - a fatigue patient - as a project for school.',
    'how-avg-title' => 'Daily Average',
    'how-avg-text' => 'The daily average is not the arithmetic mean of all entries but it is calculated with respect to time. Two entries have the same influence on the daily average as many entries, as long as they have the same time difference. <br>In the following example on both days the energy level starts at 10 and ends at 5. The difference is that the energy level in the left chart goes down to 5 earlier than in the chart on the right. The arithmetic mean would be the same for both (6.7) but clearly the day on the right is better than the one on the left. That\'s the reason why time has to be included in the calculation.',
    'how-activities-title' => 'Evaluate activities',
    'how-activities-text' => 'The energy boosting and draining activities are calculated using the data form the past 30 days. Only the direct impact of the activity on your energy level is taken into account. <br> Activities, that on average have a positive influence are displayed in descending order under the activities that boost your energy. Every activity has one of three colors. The best activity always has a green color, whereas the one with the least positive impact is yellow. The other activities are colored with one of the three colors depending on their impact. <br> The same follows for the energy draining activities.',


    'install-fd' => 'Install Fatigue Diary',
    'install-text' => 'You will soon be able to install Fatigue Diary.',
];