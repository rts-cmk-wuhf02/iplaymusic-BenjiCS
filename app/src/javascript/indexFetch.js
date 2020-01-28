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
  fetch(
    "https://api.spotify.com/v1/browse/featured-playlists?country=DK&limit=50",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + refreshtoken
      }
    }
  )
    .then(resp => resp.json())
    .then(function(data) {
      if (data.statusCode !== "200") {
        post();
      }
      console.log(data);
      const templateFeatured = document.getElementById("template__featured");
      const placer = document.getElementsByClassName("main__imgcontaner")[0];

      data.playlists.items.forEach(function(image) {
        const clone = templateFeatured.content.cloneNode(true);
        clone.querySelector(".img__background").src = image.images[0].url;
        placer.appendChild(clone);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

getfeatured();
