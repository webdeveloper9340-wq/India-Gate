'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

const filterBtnWrapper = document.querySelector(".filter-btn-wrapper");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }

  // Adjust filter button position based on header visibility
  if (filterBtnWrapper) {
    if (header.classList.contains("hide")) {
      filterBtnWrapper.classList.add("header-hidden");
    } else {
      filterBtnWrapper.classList.remove("header-hidden");
    }
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

if (heroSliderItems.length > 0 && heroSliderNextBtn && heroSliderPrevBtn) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }

  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    updateSliderPos();
  }

  heroSliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }

    updateSliderPos();
  }

  heroSliderPrevBtn.addEventListener("click", slidePrev);

  /**
   * auto slide
   */

  let autoSlideInterval;

  const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
      slideNext();
    }, 7000);
  }

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

  window.addEventListener("load", autoSlide);
}



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});



/**
 * MENU TABS
 */

const menuTabBtns = document.querySelectorAll(".menu-tab-btn");
const menuTabContents = document.querySelectorAll(".menu-tab-content");
const filterBtn = document.querySelector("[data-filter-btn]");
const filterModal = document.querySelector("[data-filter-modal]");
const filterCloseBtn = document.querySelector("[data-filter-close]");
const filterOverlay = document.querySelector("[data-filter-overlay]");
const filterTabBtns = document.querySelectorAll(".filter-tab-btn");

const setActiveTab = function(tab) {
  menuTabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  filterTabBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.filterTab === tab));
  menuTabContents.forEach(content => content.classList.toggle("active", content.dataset.tabContent === tab));
}

if (menuTabBtns.length > 0) {
  addEventOnElements(menuTabBtns, "click", function () {
    setActiveTab(this.dataset.tab);
  });
}

// Filter modal (mobile < 1200px)
if (filterBtn && filterModal) {
  const openFilter = function() {
    filterModal.classList.add("active");
    document.body.classList.add("modal-active");
  }
  const closeFilter = function() {
    filterModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  }

  filterBtn.addEventListener("click", openFilter);
  if (filterCloseBtn) filterCloseBtn.addEventListener("click", closeFilter);
  if (filterOverlay) filterOverlay.addEventListener("click", closeFilter);

  if (filterTabBtns.length > 0) {
    addEventOnElements(filterTabBtns, "click", function () {
      const targetTab = this.dataset.filterTab;
      setActiveTab(targetTab);
      closeFilter();
    });
  }
}



/**
 * FEATURES SWIPER
 */
window.addEventListener("load", function () {
  if (typeof Swiper !== 'undefined') {
    const featuresSwiper = new Swiper('.features-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: false,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4.2,
          spaceBetween: 30,
        },
      },
    });

    /**
     * GALLERY SWIPER
     */
    const gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    /**
     * TESTIMONIALS SWIPER
     */
    const testimonialsSwiper = new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: false,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
          centeredSlides: true,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 50,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 60,
          centeredSlides: false,
        },
      },
    });
  }
});
