var currentTheme = localStorage.getItem("currentTheme");
document.documentElement.setAttribute("data-theme", currentTheme);
const changeTheme = document.querySelector(".changeTheme");
const bottomMenu = document.querySelector(".footer__nav");
console.log(bottomMenu.style.background);

changeTheme.addEventListener("click", () => {
  if (document.documentElement.dataset.theme == "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("currentTheme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("currentTheme", "light");
  }
});