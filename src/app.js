// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((error) => console.log('error', error));
}

// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//     deferredPrompt = e;
// });

// async function installPWA(modal = false) {
//     if (deferredPrompt != null) {
//         deferredPrompt.prompt();
//         const { outcome } = await deferredPrompt.userChoice;
//         if (outcome === 'accepted') {
//             deferredPrompt = null;
//             if (modal) {
//                 closeModal();
//             }
//         }
//     }
// }