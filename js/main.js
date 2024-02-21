let catalogArr = [
  {
    title: "iPhone 14 Pro",
    price: 110000,
    desc: "Смартфон Apple iPhone 14 Pro 128GB",
    img: "img/1.jpg",
  },
  {
    title: "iPhone 12",
    price: 12222,
    desc: "Смартфон Apple iPhone 12 64GB",
    img: "img/1.jpg",
  },
  {
    title: "Чехол iPhone 14 Pro",
    price: 1200,
    desc: "Чехол для Apple iPhone 14 Pro - желтый",
    img: "img/2.jpg",
  },
];

let catalogArrBasket = [];

catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));

if (catalogArrBasket === null) {
  catalogArrBasket = [];
}
console.log(catalogArrBasket);
///

let mainTitle = document.createElement("h1");
mainTitle.textContent = "Каталог";
let container = document.createElement("div");
container.classList.add("container");
let basketWrap = document.createElement("div");
basketWrap.classList.add("basketWrap");
let basketWrapFooter = document.createElement("button");
basketWrapFooter.classList.add("basketWrap-footer");
basketWrapFooter.textContent = `Товаров на сумму:`;

let nightThemeBtn = document.getElementById("night-theme-btn");
nightThemeBtn.onclick = function () {
  console.log(document.body.classList.contains("night-theme"));
  if (document.body.classList.contains("night-theme") === false) {
    document.body.classList.add("night-theme");
  } else {
    document.body.classList.remove("night-theme");
  }

  const theme = localStorage.getItem("theme");

  if (theme === "night-theme") {
    localStorage.setItem("theme", "");
  } else {
    localStorage.setItem("theme", "night-theme");
  }
};

///////////////////

basketWrapFooter.onclick = function () {
  alert("Раздел в разработке");
};

let catalogList = document.createElement("ul");
catalogList.classList.add("catalog");

let basketList = document.createElement("ul");
basketList.classList.add("basket");

let emptyList = document.createElement("li");
emptyList.textContent = "В корзине нет товаров";
emptyList.classList.add("emptyList");

let basketBtn = document.createElement("img");
basketBtn.src = "img/basket.svg";
basketBtn.classList.add("basketBtn");
basketBtn.textContent = "Корзина";

const basketStatus = localStorage.getItem("basketStatus");
const basketCloseImg = localStorage.getItem("open");

if (localStorage.getItem("basketStatus")) {
  basketList.classList.add(basketStatus);
}

if (localStorage.getItem("basketCloseImg") === "open") {
  basketBtn.src = "img/close.svg";
} else {
  basketBtn.src = "img/basket.svg";
}

basketBtn.onclick = function () {
  if (basketList.classList.contains("basket-open")) {
    basketList.classList.remove("basket-open");
    basketWrapFooter.classList.add("basketWrap-footer-hide");
    basketBtn.textContent = "Корзина";

    basketBtn.src = "img/basket.svg";
    localStorage.setItem("basketCloseImg", "close");

    if (basketStatus === "basket-open") {
      localStorage.setItem("basketStatus", "");
    }
  } else {
    basketList.classList.add("basket-open");
    basketBtn.textContent = "Закрыть";
    basketBtn.src = "img/close.svg";
    localStorage.setItem("basketCloseImg", "open");

    basketWrapFooter.classList.remove("basketWrap-footer-hide");
    catalogArrBasket;
    localStorage.setItem("basketStatus", "basket-open");
  }

  ////////////////////////

  ////////////////////////
  localStorage.setItem("catalog", JSON.stringify(catalogArrBasket));
  catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));
  renderBasket(catalogArrBasket);
};

render(catalogArr);
///

//Функция возвращает карточку
function getCard(obj, index) {
  let card = document.createElement("li");
  card.classList.add("card");
  let cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.src = obj.img;
  let cardTitle = document.createElement("p");
  cardTitle.textContent = obj.title;
  let cardDesc = document.createElement("p");
  cardDesc.textContent = obj.desc;
  let cardPrice = document.createElement("p");
  cardPrice.textContent = `${obj.price} руб.`;

  let cardButton = document.createElement("button");
  cardButton.classList.add("btn");
  cardButton.textContent = "В корзину";

  cardButton.onclick = function () {
    catalogArrBasket.push(catalogArr[index]);
    render(catalogArr);
    localStorage.setItem("catalog", JSON.stringify(catalogArrBasket));
    catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));

    renderBasket(catalogArrBasket);
  };
  card.append(cardImg, cardTitle, cardDesc, cardPrice, cardButton);
  return card;
}

///
let spinner = document.createElement("div");
spinner.id = `spinner`;
spinner.classList.add("loading", "spinner");
let spinnetItem1 = document.createElement("div");
let spinnetItem2 = document.createElement("div");
let spinnetItem3 = document.createElement("div");
let spinnetItem4 = document.createElement("div");

let promise = new Promise(function (resolve, reject) {
  window.onload = function () {
    resolve();
  };

  window.onerror = function () {
    reject();
  };
});

promise.then(
  function () {
    spinner.classList.remove("loading");
    container.classList.add("containerHide");
  },

  function () {
    console.log("Ошибка загрузки");
    spinner.classList.remove("loading");
  }
);

// Рендер каталога
function render(arr) {
  catalogList.innerHTML = "";
  for (i = 0; i < arr.length; i++) {
    let item = getCard(arr[i], i);
    catalogList.append(item);
  }
}

/// КОРЗИНА

// Возвращает карточку корзины
function getCardBasket(obj, index) {
  let cardBasket = document.createElement("li");
  cardBasket.classList.add("card-basket");
  let cardImgBasket = document.createElement("img");
  cardImgBasket.classList.add("cardBasket__img");
  cardImgBasket.src = obj.img;
  let cardBasketWrap = document.createElement("div");
  cardBasketWrap.classList.add("cardBasketWrap");
  let cardTitleBasket = document.createElement("p");
  cardTitleBasket.textContent = obj.title;
  let cardPriceBasket = document.createElement("p");
  cardPriceBasket.textContent = `${obj.price} руб.`;
  let cardButtonBasket = document.createElement("button");
  cardButtonBasket.classList.add("btn__basket");
  cardButtonBasket.textContent = "Удалить";

  cardButtonBasket.onclick = function () {
    catalogArrBasket.splice(index, 1);
    localStorage.setItem("catalog", JSON.stringify(catalogArrBasket));
    catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));

    renderBasket(catalogArrBasket);
  };

  cardBasketWrap.append(cardTitleBasket, cardPriceBasket);
  cardBasket.append(cardImgBasket, cardBasketWrap, cardButtonBasket);

  localStorage.setItem("catalog", JSON.stringify(catalogArrBasket));
  catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));

  return cardBasket;
}
// Рендер корзины
function renderBasket(arr) {
  let totalPrice = 0;

  basketList.innerHTML = "";

  for (i = 0; i < arr.length; i++) {
    let item = getCardBasket(arr[i], i);

    basketList.append(item);
    totalPrice = totalPrice + arr[i].price;
    basketWrapFooter.textContent = `Товаров на сумму: ${totalPrice} руб.`;
  }

  if (basketList.classList.contains("basket-open") === false) {
    basketWrapFooter.classList.add("basketWrap-footer-hide");
  }
  if (catalogArrBasket.length === 0) {
    basketList.append(emptyList);
    basketWrapFooter.textContent = `Товаров на сумму: 0 руб.`;
  }

  if (catalogArrBasket.length > 4) {
    basketBtn.classList.add("basketBtn4");
  }
  if (
    catalogArrBasket.length < 5 ||
    basketList.classList.contains("basket-open") === false
  ) {
    basketBtn.classList.remove("basketBtn4");
  }
}

localStorage.setItem("catalog", JSON.stringify(catalogArrBasket));
// catalogArrBasket = JSON.parse(localStorage.getItem("catalog"));
// console.log(catalogArrBasket);
renderBasket(catalogArrBasket);

///
spinner.append(spinnetItem1, spinnetItem2, spinnetItem3, spinnetItem4);
container.append(catalogList, basketWrap, basketBtn);
basketWrap.append(basketList, basketWrapFooter);
document.body.append(spinner, mainTitle, container);
