// NOTE: If you want to use this method, you need to change "manifest_version" to 2, and add "webRequestBlocking" permission in manifest.json
// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     console.log('details', details);

//     const url = details.url;
//     const filters = [
//       'googleadservices',
//       'googlesyndication',
//       'g.doubleclick.net',
//     ];
//     for (const filter of filters) {
//       if (url.indexOf(filter) !== -1) {
//         console.log('blocked url', url);
//         return {
//           cancel: true,
//         };
//       }
//     }

//     return {
//       cancel: false,
//     };
//   },
//   {
//     urls: ['<all_urls>'],
//   },
//   ['blocking']
// );
