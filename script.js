const giphyApiKey = "PE24ajuCVtA2Gvm82Al1jMoJe6F3JgW6";

const countDownDate = new Date("May 6, 2022 12:00:01").getTime();

const x = setInterval(() => {
  const now = new Date().getTime();
  const delta = countDownDate - now;
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((delta % (1000 * 60)) / 1000);

  document.getElementById(
    "countdown"
  ).innerHTML = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}, 1000);

function searchTerms(...terms) {
  return terms.reduce((concated, term) => {
    return `${concated}-${term}`;
  }, "");
}

let scarletWitch = ["scarlet", "witch"];
let drstrange = ["doctor", "strange"];

async function fetchRandom(terms) {
  return window
    .fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${searchTerms(
        terms
      )}&rating=pg13`
    )
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    );
}

const setHtmlById = (elId, url) =>
  (document.getElementById(elId).innerHTML = imgMarkup(url));

const imgMarkup = (url) => `<img src=${url} alt='gif' />`;

fetchRandom(scarletWitch)
  .then((res) => {
    if (res.meta.status === 200) {
      const {
        images: {
          fixed_height: { url },
        },
      } = res.data[Math.floor(Math.random() * 20)];
      document.getElementById(
        "rando"
      ).innerHTML = `<img src=${url} alt='gif' />`;
    }
  })
  .catch((err) => console.warn("Error", err));
