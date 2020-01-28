let params = new URLSearchParams(window.location.search);
const playlist = params.get("playlist");

let base64Token = window.btoa(
  "65b5a46dffa441a4a68af4d29e6dd2e4:8426778dd5b942cfa1f8cbb311818b39"
);

function post() {
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: "Basic " + base64Token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  })
    .then(resp => resp.json())
    .then(function(data) {
      let key = data.access_token;
      sessionStorage.setItem("refreshtoken", key);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getfeatured() {
  let refreshtoken = sessionStorage.getItem("refreshtoken");
  fetch(`https://api.spotify.com/v1/albums/${playlist}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + refreshtoken
    }
  })
    .then(resp => resp.json())
    .then(function(data) {
      if (data.statusCode !== "200") {
        post();
      }
      console.log(data);

      document.querySelector(".albumDetalis__title").innerHTML = data.name;
      document.querySelector(
        ".albumDetalis__songs"
      ).innerText = `${data.total_tracks} Songs`;

      document.querySelector(
        ".main__albumDetalis"
      ).style.backgroundImage = `url(${data.images[0].url})`;
      if (data.genres.length == 0) {
        // document.querySelector(".swiper-container").style.display = "none";
        // console.log(data.genres.length);
      } else {
        const templateSwiperContaner = document.querySelector(
          "#swiper-container-Template"
        );
        const placer = document.getElementsByClassName(
          "albumDetalis__genres"
        )[0];
        data.genres.forEach(function(genres) {
          const clone = templateSwiperContaner.content.cloneNode(true);
          clone.querySelector(".swiper-content").innerText = genres.genres;
          placer.appendChild(clone);
        });
      }

      const templateSongList = document.querySelector("#song__list-Template");
      const songPlacer = document.getElementsByClassName("song__list")[0];

      data.tracks.items.forEach(function(song) {
        const clone = templateSongList.content.cloneNode(true);
        clone.querySelector(".text__title").innerText = song.name;
        clone.querySelector(".text__subtitle").innerText = data.artists[0].name;

        var ms = song.duration_ms;
        var min = ms / 1000 / 60;
        var r = min % 1;
        var sec = Math.floor(r * 60);
        if (sec < 10) {
          sec = "0" + sec;
        }
        min = Math.floor(min);

        clone.querySelector(".row__songs").innerText = min + ":" + sec;

        songPlacer.appendChild(clone);
      });

      var swiper = new Swiper(".swiper-container", {
        slidesPerView: 2,
        spaceBetween: 25,
        grabCursor: true,
        freeMode: true,
        centeredSlides: true,
        loop: true,
        loopedSlides: 3
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

getfeatured();
