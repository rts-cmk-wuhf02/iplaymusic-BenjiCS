let params = new URLSearchParams(window.location.search);
const playlist = params.get("playlist");
const trackNumber = params.get("track_number");

var music = document.querySelector(".music");
var btn = document.getElementById("play-pause");
var btnBack = document.getElementById("backward");
var btnForward = document.getElementById("forward");
var progressBar = document.getElementById("progress-bar");
var progressDot = document.querySelector(".dot");

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
      console.log(trackNumber);
      console.log(data);
      let track = trackNumber - 1;
      console.log(track);
      console.log(data.tracks.items[track].name);
      document
        .querySelector(".music")
        .setAttribute("src", data.tracks.items[track].preview_url);
      document
        .querySelector(".music")
        .setAttribute("src", data.tracks.items[track].preview_url);
      // var ms = data.tracks.items[track].duration_ms;
      // var min = ms / 1000 / 60;
      // var r = min % 1;
      // var sec = Math.floor(r * 60);
      // if (sec < 10) {
      //   sec = "0" + sec;
      // }
      // min = Math.floor(min);

      // document.querySelector(".song__length").innerText = min + ":" + sec;

      function tooglePlayPause() {
        if (music.paused) {
          btn.className = "buttons-pause";
          music.play();
        } else {
          btn.className = "buttons-play";
          music.pause();
        }
      }

      music.onended = function() {
        btn.className = "buttons-play";
      };

      btn.onclick = function() {
        tooglePlayPause();
      };

      music.addEventListener("timeupdate", updateProgressBar, false);

      function updateProgressBar() {
        var percentage = Math.floor((100 / music.duration) * music.currentTime);
        progressBar.value = percentage;
        document.querySelector(
          ".song__time"
        ).innerText = music.currentTime.toFixed(0);
        var ms = music.duration.toFixed(1);
        // var min = ms / 1000 / 60;
        // var r = min % 1;
        // var sec = Math.floor(r * 60);
        // if (sec < 10) {
        //   sec = "0" + sec;
        // }
        // min = Math.floor(min);
        // console.log(music.duration);
        document.querySelector(".song__length").textContent = ms;
        progressDot.style.left = percentage - 5 + "%";
      }

      progressBar.addEventListener("click", seek);

      function seek(e) {
        var percent = e.offsetX / this.offsetWidth;
        music.currentTime = percent * music.duration;
        e.target.value = Math.floor(percent / 100);
      }

      btnBack.onclick = function() {
        music.currentTime -= 5;
      };

      btnForward.onclick = function() {
        music.currentTime += 5;
      };
    })
    .catch(function(error) {
      console.log(error);
    });
}

getfeatured();
