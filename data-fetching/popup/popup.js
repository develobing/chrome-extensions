chrome.storage.local.get(['shows'], (res) => {
  console.log('shows', res.shows);

  const shows = res.shows;
  shows.forEach((show) => {
    renderShow(show);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  console.log('sender', sender);
  console.log('sendResponse', sendResponse);
});

function renderShow({ show }) {
  const showDiv = document.createElement('div');
  showDiv.classList.add('show');

  const showTitle = document.createElement('h3');
  showTitle.textContent = show.name;

  const showImg = document.createElement('img');
  if (show.image?.medium) showImg.src = show.image.medium;

  showDiv.appendChild(showTitle);
  showDiv.appendChild(showImg);
  document.body.appendChild(showDiv);
}
