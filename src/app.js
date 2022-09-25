// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((error) => console.log('error', error));
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});

function installPWA() {
    const installApp = document.getElementById('installApp');

    installApp.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    });
}