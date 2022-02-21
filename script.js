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

async function fetchRandom() {
  return window
    .fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=doctor-strange&rating=pg13`
    )
    .then((response) => {
      console.log("response", response["url"]);
      image = response["url"];
      return response.json();
    });
}

fetchRandom().then((res) => {
  console.log("res", res.data[0]);
  if (res.meta.status === 200) {
    const {
      images: {
        fixed_height: { url },
      },
    } = res.data[Math.floor(Math.random() * 20)];
    document.getElementById("rando").innerHTML = `<img src=${url} alt='gif' />`;
  }
});
