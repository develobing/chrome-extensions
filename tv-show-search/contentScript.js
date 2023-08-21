console.log('Hello from content script!');
// confirm('Hello from content script!');

const text = [];

const aTags = document.querySelectorAll('a');
for (const tag of aTags) {
  // tag.textContent = 'Hello World!';
  // if (tag.textContent.includes('i')) {
  //   tag.style.backgroundColor = '#FF00FF';
  // }

  text.push(tag.textContent);
}

chrome.storage.local.set({
  text,
});

chrome.runtime.sendMessage(null, text, (response) => {
  console.log("I'm from the send response function:", response);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  console.log('sender', sender);
  console.log('sendResponse', sendResponse);
});
