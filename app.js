const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCfpfvYnkY_8Vkxp3AHaXumDJSoH6nKeyk";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

async function getVideos() {
  try {
    const res = await fetch(
      video_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          chart: "mostPopular",
          maxResults: 10,
          regionCode: "CO",
        })
    );
    const data = await res.json();
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  } catch (err) {
    console.log(err);
  }
}

const getChannelIcon = async (video_data) => {
  try {
    const res = await fetch(
      channel_http +
        new URLSearchParams({
          key: api_key,
          part: "snippet",
          id: video_data.snippet.channelId,
        })
    );
    const data = await res.json();
    video_data.channelThumbnail =
      data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
  } catch (err) {
    console.log(err);
  }
};

const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
  <iframe class="thumbnail" width="560" height="315" src="https://www.youtube.com/embed/${data.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in- picture; web-share" allowfullscreen load="lazy"></iframe>
    <div class="content">
      <img src="${data.channelThumbnail}" alt="" class="channel-icon">
      <div class="info">
      <h4 class="title">${data.snippet.title}</h4>
      </div>
    </div>
  </div>
   `;
};

const searchInut = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if (searchInut.value.length) {
    location.href = searchLink + searchInut.value;
  }
});

getVideos();
