const rules: {
  [url: string]: () => void;
} = {
  'https://www.nytimes.com/section/technology': filterNYTTechnologyClassNames,
};

function filterNYTTechnology() {
  const wrapper = document.querySelector('#top-wrapper');
  wrapper?.parentNode.removeChild(wrapper);
}

function filterNYTTechnologyClassNames() {
  const divs = document.querySelectorAll('div');
  for (const div of divs) {
    if (div.className.includes('ad')) {
      div.style.display = 'none';
    }
  }
}

const filterUrl = Object.keys(rules).find((url) => {
  return document.URL.indexOf(url) !== -1;
});

if (filterUrl) {
  rules[filterUrl]();
}
