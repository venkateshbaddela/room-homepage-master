"use strict";

/*/////////////////////////// 
Variable declaration 
///////////////////////////*/
const bodyEL = document.querySelector("body");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

/* Slider variable declaration */
const slider = document.querySelector(".slider-container");
const sliderCon = Array.from(document.querySelectorAll(".slider-content"));
const sliderImg = Array.from(document.querySelectorAll(".slider-img"));
const imgSlider = document.querySelector(".img-slide");
const conSlider = document.querySelector(".con-slide");
const imgContainer = document.querySelector(".img-container");
const conContainer = document.querySelector(".con-container");

let resizeTimer;
let imgTransformTimer;
let slideImg = sliderImg.length - 2,
  slideCon = sliderCon.length,
  imgSize,
  conSize;

/* Navigation variable declaration */
const wrapper = document.querySelector(".wrapper");
const nav = document.querySelector(".nav-box");
const navBtn = document.querySelector(".nav-btn");
const navImg = document.querySelector(".nav-btn__img");

/* Clones of first and last images  */
const imgLastClone = sliderImg[sliderImg.length - 1].cloneNode(true);
imgLastClone.id = "last-img__clone";
imgSlider.prepend(imgLastClone);

const imgFirstClone = sliderImg[0].cloneNode(true);
imgFirstClone.id = "first-img__clone";
imgSlider.append(imgFirstClone);

/* Clones of first and last contents  */
const conLastClone = sliderCon[sliderCon.length - 1].cloneNode(true);
conLastClone.id = "last-con__clone";
conSlider.prepend(conLastClone);

const conFirstClone = sliderCon[0].cloneNode(true);
conFirstClone.id = "first-con__clone";
conSlider.append(conFirstClone);

/*///////////////////////////
 Functions 
 ///////////////////////////*/

/* Function to translate image slide */
const getImgSlide = function (transitionVal) {
  imgSlider.style.transform = `translateX(${-imgSize * slideImg}px)`;
  imgSlider.style.transition = transitionVal;
};

/* Function to translate content slide */
const getConSlide = function (transitionVal) {
  conSlider.style.transform = `translateX(${conSize * -slideCon}px)`;
  conSlider.style.transition = transitionVal;
};

/* Function to get sizes og image and content*/
const imgConSize = function () {
  imgSize = imgSlider.clientWidth;
  conSize = conSlider.clientWidth;
};
/* Function to open navigation*/
const navOpen = function () {
  navImg.src = "images/icon-close.svg";
  wrapper.classList.add("wrapper-open");
  bodyEL.style.overflow = "hidden";
};

/* Function to close navigation*/
const navClose = function () {
  navImg.src = "images/icon-hamburger.svg";
  wrapper.classList.remove("wrapper-open");
  bodyEL.style.overflow = "visible";
};

imgConSize();
getImgSlide("none");
getConSlide("none");
/*///////////////////////////
Event Listeners  
///////////////////////////*/

/* Event Listener to get next slide*/
btnRight.addEventListener("click", function () {
  if (slideImg >= sliderImg.length + 1) return;
  if (slideCon <= 0) return;
  slideImg++;
  slideCon--;

  getImgSlide("transform 0.4s ease-in-out");
  getConSlide("transform 0.4s ease-in-out");
});

/* Event Listener to get previous slide*/
btnLeft.addEventListener("click", function () {
  if (slideImg <= 0) return;
  if (slideCon >= sliderCon.length + 1) return;
  slideImg--;
  slideCon++;

  getImgSlide("transform 0.4s ease-in-out");
  getConSlide("transform 0.4s ease-in-out");
});

/* Event Listener to end transition and translate to first and last slide*/
imgSlider.addEventListener("transitionend", function () {
  if (slideImg === 0) {
    slideImg = sliderImg.length;
    getImgSlide("none");
  } else if (slideImg === sliderImg.length + 1) {
    slideImg = sliderImg.length - 2;
    getImgSlide("none");
  }

  if (slideCon === 0) {
    slideCon = sliderCon.length;
    getConSlide("none");
  } else if (slideCon === sliderCon.length + 1) {
    slideCon = sliderCon.length - 2;
    getConSlide("none");
  }
});

/* Event Listener to close navigation when document is resized*/
window.addEventListener("resize", function (e) {
  bodyEL.classList.add("preload");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    bodyEL.classList.remove("preload");
  }, 300);

  nav.classList.remove("nav-open");
  navClose();
  imgConSize();
  getImgSlide("none");
  getConSlide("none");
});

/* Event Listener to open and close navigation*/
navBtn.addEventListener("click", function () {
  nav.classList.toggle("nav-open");

  clearTimeout(imgTransformTimer);
  imgTransformTimer = setTimeout(() => {
    if (nav.classList.contains("nav-open")) {
      navOpen();
      imgConSize();
      getImgSlide("none");
      getConSlide("none");
    } else {
      navClose();
      imgConSize();
      getImgSlide("none");
      getConSlide("none");
    }
  }, 200);
});
