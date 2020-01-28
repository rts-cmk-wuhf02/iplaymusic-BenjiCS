var music = document.querySelector(".music");
var btn = document.getElementById("play-pause");
var progressBar = document.getElementById("progress-bar");
var progressDot = document.querySelector(".dot");

function tooglePlayPause() {
  if (music.paused) {
    btn.className = "buttons-pause";
    music.play();
  } else {
    btn.className = "buttons-play";
    music.pause();
  }
}

btn.onclick = function() {
  tooglePlayPause();
};

music.addEventListener("timeupdate", updateProgressBar, false);

function updateProgressBar() {
  var percentage = Math.floor((100 / music.duration) * music.currentTime);
  progressBar.value = percentage;
  progressDot.style.left = percentage - 5 + "%";
}

progressBar.addEventListener("click", seek);

function seek(e) {
  var percent = e.offsetX / this.offsetWidth;
  music.currentTime = percent * music.duration;
  e.target.value = Math.floor(percent / 100);
}
