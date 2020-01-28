var swiper = new Swiper(".swiper-container", {
  effect: "coverflow",
  slidesPerView: 3,
  spaceBetween: 25,
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  loopedSlides: 3,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1
  }
});