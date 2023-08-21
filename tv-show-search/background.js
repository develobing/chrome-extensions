console.log('background script loaded');

chrome.runtime.onInstalled.addListener((details) => {
  console.log('onInstalled() - details', details);

  // Set default value for storage
  chrome.storage.local.set({
    shows: [],
  });

  // Parent Context Menu
  chrome.contextMenus.create({
    id: 'testContextMenu',
    title: 'TV Show Extension',
    contexts: ['page', 'selection'],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    console.log('testContextMenu onClicked() - event', event);

    if (event.menuItemId === 'imdbSearch') {
      // chrome.search.query({
      //   disposition: 'NEW_TAB',
      //   text: `imdb ${event.selectionText}`,
      // });

      // chrome.tabs.query()
      chrome.tabs.query(
        {
          currentWindow: true,
        },
        (tabs) => {
          console.log('chrome.tabs.query - tabs', tabs);
        }
      );

      // chrome.tabs.create()
      chrome.tabs.create({
        url: `https://www.imdb.com/find/?q=${event.selectionText}&ref_=nv_sr_sm`,
      });
    } else if (event.menuItemId === 'tvmazeApi') {
      fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('data', data);

          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (event.menuItemId === 'readText') {
      chrome.tts.speak(event.selectionText, {
        rate: 2,
        lang: 'en-US',
      });
    }
  });

  // Child Context Menus
  chrome.contextMenus.create({
    id: 'imdbSearch',
    parentId: 'testContextMenu',
    title: 'IMDB Search - 1',
    contexts: ['page', 'selection'],
  });
  chrome.contextMenus.create({
    id: 'tvmazeApi',
    parentId: 'testContextMenu',
    title: 'TV Maze API',
    contexts: ['page', 'selection'],
  });
  chrome.contextMenus.create({
    id: 'readText',
    parentId: 'testContextMenu',
    title: 'Read Text',
    contexts: ['page', 'selection'],
  });
});

chrome.storage.local.get(['text'], (res) => {
  console.log('res', res);
});

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log('msg', msg);
//   console.log('sender', sender);
//   console.log('sendResponse', sendResponse);
//   sendResponse('received message from background');

//   chrome.tabs.sendMessage(sender.tab.id, 'Got your message from background!');
// });
