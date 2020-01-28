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
    "https://api.spotify.com/v1/albums?ids=4jX7WkXgBupTiZR5xVtXtO%2C05ytRpOKQ4bEj5IJIrDONK%2C4cJY0mS3aDyO6IltK41rAK%2C4QXkUPo1KPQ0SI3JhnAvFe%2C6t7DDURGibSzno4cfwmAWa",
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
      const templateAlbum = document.getElementById("template__album");
      const placer = document.getElementsByClassName("album__contaner")[0];

      data.albums.forEach(function(album) {
        const clone = templateAlbum.content.cloneNode(true);
        clone.querySelector(
          ".contaner__row"
        ).href = `/albumDetails/?playlist=${album.id}`;
        clone.querySelector(".row__img").src = album.images[0].url;
        clone.querySelector(".row__img").alt = album.name;
        clone.querySelector(".text__title").innerText = album.label;
        clone.querySelector(".text__subtitle").innerText = album.name;
        clone.querySelector(
          ".row__songs"
        ).innerText = `${album.total_tracks} Songs`;
        placer.appendChild(clone);
      });

      const templateSlider_placer = document.getElementById("slider__album");
      const Slider_placer = document.getElementsByClassName(
        "swiper-wrapper"
      )[0];
      data.albums.forEach(function(albumSlider) {
        const clone = templateSlider_placer.content.cloneNode(true);
        clone.querySelector(
          ".swiper-slide"
        ).style = `background-image: url(${albumSlider.images[0].url})`;
        Slider_placer.appendChild(clone);
      });

      var swiper = new Swiper(".swiper-container", {
        slidesPerView: 3,
        spaceBetween: 25,
        grabCursor: true,
        freeMode: true,
        loop: true,
        loopedSlides: 3
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

getfeatured();
