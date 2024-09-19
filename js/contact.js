var up = document.querySelector(".upp");
up.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

var nav = document.querySelector(".nav");
var menu = document.querySelector(".right .con .menu");
var togglemenu = document.querySelector(".nav .toggleMenu");
menu.addEventListener("click", () => {
  togglemenu.classList.toggle("active");
  togglemenu.style.cssText = "z-index:1111111";
});

window.onscroll = function () {
  if (window.scrollY > 113) {
    nav.style.cssText =
      "position: fixed; top:0; left:0; width:100%; z-index:1000";
    up.style.transform = "scale(1)";
  } else {
    nav.style.cssText = "position: relative;";
    up.style.transform = "scale(0)";
  }
};
