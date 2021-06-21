/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/prefer-default-export
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/gantt-organon/sw.js').then((registration: any) => {
        // Registration was successful
        const data = {
          type: 'CACHE_URLS',
          payload: [
            location.href,
            ...performance.getEntriesByType('resource').map((r) => r.name),
          ],
        };

        registration.installing.postMessage(data);
      }).catch((err) => {
        // registration failed :(
        // console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
};
