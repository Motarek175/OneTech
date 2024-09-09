// toggle menu + scroll to top
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
  if (window.scrollY > 100) {
    nav.style.cssText =
      "position: fixed; top:0; left:0; width:100%; z-index:1000";
    up.style.transform = "scale(1)";
  } else {
    nav.style.cssText = "position: relative;";
    up.style.transform = "scale(0)";
  }
};

// countdown
function countDown(days, hours, minutes, seconds) {
  if (!localStorage.getItem("countdownDays")) {
    localStorage.setItem("countdownDays", days);
    localStorage.setItem("countdownHours", hours);
    localStorage.setItem("countdownMinutes", minutes);
    localStorage.setItem("countdownSeconds", seconds);
  } else {
    days = parseInt(localStorage.getItem("countdownDays"));
    hours = parseInt(localStorage.getItem("countdownHours"));
    minutes = parseInt(localStorage.getItem("countdownMinutes"));
    seconds = parseInt(localStorage.getItem("countdownSeconds"));
  }
  function updateCountDown() {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          if (days === 0) {
            document.getElementById("countdown").innerHTML =
              "00 : 00 : 00 : 00";
            return;
          } else {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        } else {
          hours--;
          minutes = 59;
          seconds = 59;
        }
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    localStorage.setItem("countdownDays", days);
    localStorage.setItem("countdownHours", hours);
    localStorage.setItem("countdownMinutes", minutes);
    localStorage.setItem("countdownSeconds", seconds);
    let day = days < 10 ? "0" + days : days;
    let hour = hours < 10 ? "0" + hours : hours;
    let minute = minutes < 10 ? "0" + minutes : minutes;
    let second = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector(".countdown0").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown0"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    document.querySelector(".countdown1").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown1"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    document.querySelector(".countdown2").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown2"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    setTimeout(updateCountDown, 1000);
  }
  updateCountDown();
}
countDown(12, 22, 2, 45);

// deals
let feature = document.querySelector(
  ".deal .container .row .right .items .content .feature"
);
let onsal = document.querySelector(
  ".deal .container .row .right .items .content .onsal"
);
let best = document.querySelector(
  ".deal .container .row .right .items .content .best"
);
let headings = document.querySelectorAll(
  ".deal .container .row .right .items .head button"
);

headings.forEach((button) => {
  button.addEventListener("click", () => {
    headings.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      feature.style.display = "flex";
      onsal.style.display = "none";
      best.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      onsal.style.display = "flex";
      best.style.display = "none";
      feature.style.display = "none";
    } else {
      feature.style.display = "none";
      best.style.display = "flex";
      onsal.style.display = "none";
    }
  });
});

// newArrival
let feat = document.querySelector(".newArrival .container .row .left .feature");
let onsa = document.querySelector(".newArrival .container .row .left  .onsal");
let bes = document.querySelector(".newArrival .container .row .left  .best");
let heading = document.querySelectorAll(
  ".newArrival .container .row  .buttons button"
);
heading.forEach((button) => {
  button.addEventListener("click", () => {
    heading.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      feat.style.display = "flex";
      onsa.style.display = "none";
      bes.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      onsa.style.display = "flex";
      bes.style.display = "none";
      feat.style.display = "none";
    } else {
      feat.style.display = "none";
      bes.style.display = "flex";
      onsa.style.display = "none";
    }
  });
});

// hot best seller
let hotfeat = document.querySelector(".bestSeller .container  .feature");
let hotonsal = document.querySelector(".bestSeller .container .onsal");
let hotbest = document.querySelector(".bestSeller .container  .best");
let hotheading = document.querySelectorAll(
  ".bestSeller .container .row  .buttons button"
);
hotheading.forEach((button) => {
  button.addEventListener("click", () => {
    hotheading.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      hotfeat.style.display = "flex";
      hotonsal.style.display = "none";
      hotbest.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      hotonsal.style.display = "flex";
      hotbest.style.display = "none";
      hotfeat.style.display = "none";
    } else {
      hotfeat.style.display = "none";
      hotbest.style.display = "flex";
      hotonsal.style.display = "none";
    }
  });
});

// cart and wishlist
let span = document.querySelector(
  "header .main .container .row .icon .cart .counter span"
);
let pric = document.querySelector(
  "header .main .container .row .icon .cart .info small"
);
let whishlist = document.querySelector(
  "header .main .container .row .icon .whishlist .counter span"
);
let cartcounter = 0;
let cartprice = 0;
let whishlistcounter = 0;
let card;
let cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
let test = document.querySelectorAll(".testbutton");
let testheart = document.querySelectorAll(".testheart");
let favcontainer = [];
let btnState = [];

// add and remove from cart
window.onload = function () {
  testheart.forEach((heart) => {
    updateHeartState(heart);
  });
  if (JSON.parse(localStorage.getItem("cartCounter"))) {
    cartcounter = JSON.parse(localStorage.getItem("cartCounter"));
    cartprice = JSON.parse(localStorage.getItem("cartPrice"));
    span.innerHTML = cartcounter;
    pric.innerHTML = `$ ${cartprice}`;
    test.forEach((button) => {
      updateButtonState(button);
    });
  } else {
    localStorage.setItem("cartCounter", 0);
    localStorage.setItem("cartPrice", 0);
    test.forEach((button) => {
      updateButtonState(button);
    });
  }
};

function updateButtonState(button) {
  const state = localStorage.getItem(`${button.id}`);
  if (state === "1") {
    button.classList.add("active");
    button.innerHTML = "Remove";
  } else {
    button.classList.remove("active");
    button.innerHTML = "Add Cart";
  }
}
test.forEach((btn) => {
  updateButtonState(btn);
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    card = btn.parentNode;
    let cardname = card.querySelector(".text strong")?.textContent;
    if (btn.classList.contains("active")) {
      localStorage.setItem(`${btn.id}`, "1");
      btnState.push(`${btn.id}`);
      btn.innerHTML = "Remove";
      // start add
      cartcounter++;
      cartprice += 357;
      span.innerHTML = cartcounter;
      pric.innerHTML = `$ ${cartprice}`;
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      // end add
      let details = {
        button: card.querySelector("button")?.classList,
        cardimg: card.querySelector(".img img")?.src,
        cardprice: card.querySelector(".text small:nth-of-type(1)")
          ?.textContent,
        cardtype: card.querySelector(".text small:nth-of-type(2)")?.textContent,
        cardname: cardname,
        numcards: 1,
      };
      cardContainer.push(details);
      localStorage.setItem("Details", JSON.stringify(cardContainer));
      localStorage.setItem("State", JSON.stringify(btnState));
    } else {
      localStorage.setItem(`${btn.id}`, "0");
      btn.innerHTML = "Add Cart";
      // start remove
      cartcounter--;
      cartprice -= 357;
      if (cartcounter <= 0) {
        cartprice = 0;
        cartcounter = 0;
      }
      span.innerHTML = cartcounter;
      pric.innerHTML = `$ ${cartprice}`;
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      let index = cardContainer.findIndex((item) => item.cardname === cardname);
      if (index !== -1) {
        cardContainer.splice(index, 1);
        btnState.splice(index, 1);
        localStorage.setItem("Details", JSON.stringify(cardContainer));
        localStorage.setItem("State", JSON.stringify(btnState));
      }
    }
    testt(btn);
  });
});

// add and remove from wishlist
if (JSON.parse(localStorage.getItem("wishcounter"))) {
  wishcounter = JSON.parse(localStorage.getItem("wishcounter"));
  whishlist.innerHTML = wishcounter;
} else {
  localStorage.setItem("wishcounter", 0);
}
function updateHeartState(heart) {
  const stat = localStorage.getItem(`heart-${heart.id}`);
  if (stat === "1") {
    heart.classList.add("active");
    heart.style.cssText = "color:red";
  } else {
    heart.classList.remove("active");
    heart.style.cssText = "color:black";
  }
}

testheart.forEach((heart) => {
  updateHeartState(heart);
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
    wish = heart.parentNode;
    if (heart.classList.contains("active")) {
      localStorage.setItem(`heart-${heart.id}`, "1");
      heart.style.cssText = "color:red";
      // start add to wishlist
      whishlistcounter++;
      whishlist.innerHTML = whishlistcounter;
      localStorage.setItem("wishcounter", whishlistcounter);
      // end add to wishlist
      let details = {
        favimg: wish.querySelector(".image img")?.src,
        favprice: wish.querySelector(".text p")?.textContent,
        favtype: wish.querySelector(".text small")?.textContent,
        favname: wish.querySelector(".text a")?.textContent,
      };
      favcontainer.push(details);
      localStorage.setItem("wish", JSON.stringify(favcontainer));
    } else {
      localStorage.setItem(`heart-${heart.id}`, "0");
      heart.style.cssText = "color:black";
      // start remove fromt wishlist
      whishlistcounter--;
      if (whishlistcounter <= 0) {
        whishlistcounter = 0;
      }
      whishlist.innerHTML = whishlistcounter;
      localStorage.setItem("wishcounter", whishlistcounter);
      // end remove fromt wishlist
    }
  });
});
