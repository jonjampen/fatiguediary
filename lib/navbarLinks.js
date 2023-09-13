export let links = {
    main: [
        {
            name: 'Information',
            link: '/',
        },
        {
            name: 'App',
            link: '/user/dashboard',
        },
        {
            name: 'Instructions',
            link: '/instructions',
        },
        {
            name: 'Contact',
            link: '/contact',
        },
        {
            name: 'Submit Feedback',
            link: '/feedback',
            loginRequired: true
        },
    ],
    profile: [
        {
            name: 'Your Account',
            link: '/user/account',
        },
        {
            name: 'Settings',
            link: '/user/settings',
        },
        {
            name: 'Sign Out',
            link: '/logout',
        },
    ],
}