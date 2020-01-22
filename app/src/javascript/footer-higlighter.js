var url = document.URL;
var filename = url.replace("http://localhost:8080/", "").replace("/", "");
if (filename == "") {
  document.querySelector(".site__title").innerHTML += "Featured";
  document.querySelector(".index").style = "fill: var(--footer-logo);"
  document.querySelector(".index-background").style = "fill: var(--footer-background);"
} else if (filename == "album") {
  document.querySelector(".site__title").innerHTML += "Music";
  document.querySelector(".album").style = "fill: var(--text-color);"
  
} else if (filename == "playlists") {
  document.querySelector(".site__title").innerHTML += "playlists";
  document.querySelector(".playlists").style = "fill: var(--text-color);"
} else {
  document.querySelector(".site__title").innerHTML += filename;
  document.querySelector(".categories").style = "fill: var(--text-color);"
}