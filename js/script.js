function copyEmail() {
  const email = "jonathan.cwb3@gmail.com";
  navigator.clipboard
    .writeText(email)
    .then(() => {
      alert(
        "The email address jonathan.cwb3@gmail.com has been copied to your clipboard.",
      );
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
}

AOS.init();

//CAROUSEL
const slider = document.querySelectorAll(".slider");
const btnPrev = document.getElementById("prev-button");
const btnNext = document.getElementById("next-button");

let currentSlide = 0;

function hideSlider() {
  slider.forEach((item) => item.classList.remove("on"));
}

function showSlider() {
  slider[currentSlide].classList.add("on");
}

function nextSlider() {
  hideSlider();
  if (currentSlide === slider.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  showSlider();
}

function prevSlider() {
  hideSlider();
  if (currentSlide === 0) {
    currentSlide = slider.length - 1;
  } else {
    currentSlide--;
  }
  showSlider();
}

btnNext.addEventListener("click", nextSlider);
btnPrev.addEventListener("click", prevSlider);

//GALERY
const imgContent = document.querySelectorAll(".img-content-hover");

function showImgContent(e) {
  for (var i = 0; i < imgContent.length; i++) {
    x = e.pageX;
    y = e.pageY;
    imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

document.addEventListener("mousemove", showImgContent);

//SCROLL SELECT
const links = document.querySelectorAll(".list-bar");
const sections = document.querySelectorAll(".sections");
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 100;
    let heightSection = section.offsetHeight;
    let idSection = section.getAttribute("id");

    if (top >= offset && top < offset + heightSection) {
      links.forEach((link) => {
        link.classList.remove("actived");

        document
          .querySelector(`header nav a[href*='${idSection}']`)
          .classList.add("actived");
      });
    }
  });
});

//SCROLL BTN/LIST
const elements = document.querySelectorAll(".hidden-scroll");

const myObserver = new IntersectionObserver((a) => {
  a.forEach((entry) => {
    if (entry.isIntersecting === true) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

elements.forEach((element) => {
  myObserver.observe(element);
});

//RESPONSIVE NAV
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(".mobile-menu", ".list", ".list li");
mobileNavbar.init();

// FECHA MENU AO CLICAR NO X
const closeMenuBtn = document.querySelector(".close-menu");
const navList = document.querySelector(".list");
const mobileMenu = document.querySelector(".mobile-menu");

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", () => {
    navList.classList.remove("active");
    mobileMenu.classList.remove("active");
    closeMenuBtn.classList.add("hidden");
  });
}

// FECHA MENU AO CLICAR EM UM LINK
const navLinks = document.querySelectorAll(".list-bar");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    mobileMenu.classList.remove("active");
    if (closeMenuBtn) {
      closeMenuBtn.classList.add("hidden");
    }
  });
});

// MOSTRA O X QUANDO ABRE O MENU
const originalHandleClick = mobileNavbar.handleClick;
mobileNavbar.handleClick = function () {
  originalHandleClick.call(this);
  const closeMenuBtn = document.querySelector(".close-menu");
  if (navList.classList.contains("active")) {
    if (closeMenuBtn) {
      closeMenuBtn.classList.remove("hidden");
    }
  }
};

//CAROUSEL COPA AMERICA
document.addEventListener("DOMContentLoaded", function () {
  const copaImages = document.querySelectorAll(".copa-img");
  const prevBtn = document.getElementById("prev-copa");
  const nextBtn = document.getElementById("next-copa");

  if (copaImages.length > 0 && prevBtn && nextBtn) {
    let currentIndexCopa = 0;
    let autoPlayInterval;

    // Show first image
    if (copaImages[0]) {
      copaImages[0].classList.add("active");
    }

    // Create counter element
    const counterEl = document.createElement("div");
    counterEl.className = "carousel-counter";
    counterEl.textContent = `1 / ${copaImages.length}`;
    const carouselEl = document.querySelector(".carrossel-copaAmerica");
    if (carouselEl) {
      carouselEl.appendChild(counterEl);
    }

    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "carousel-progress";
    progressBar.style.width = "0%";
    if (carouselEl) {
      carouselEl.appendChild(progressBar);
    }

    function updateCounter() {
      counterEl.textContent = `${currentIndexCopa + 1} / ${copaImages.length}`;
    }

    function updateProgress() {
      const progress = ((currentIndexCopa + 1) / copaImages.length) * 100;
      progressBar.style.width = progress + "%";
    }

    function goToSlide(index) {
      // Hide all images
      copaImages.forEach((img) => {
        img.classList.remove("active");
      });

      // Show selected image
      currentIndexCopa = index;
      if (copaImages[currentIndexCopa]) {
        copaImages[currentIndexCopa].classList.add("active");
      }

      // Update counter and progress
      updateCounter();
      updateProgress();
    }

    function nextSlide() {
      const newIndex = (currentIndexCopa + 1) % copaImages.length;
      goToSlide(newIndex);
    }

    function prevSlide() {
      const newIndex =
        (currentIndexCopa - 1 + copaImages.length) % copaImages.length;
      goToSlide(newIndex);
    }

    // Event listeners for buttons
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });

    // Auto play functionality
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    // Start auto play
    startAutoPlay();

    // Pause on hover
    if (carouselEl) {
      carouselEl.addEventListener("mouseenter", () => {
        clearInterval(autoPlayInterval);
      });

      carouselEl.addEventListener("mouseleave", () => {
        startAutoPlay();
      });
    }

    // Initialize counter and progress
    updateCounter();
    updateProgress();
  }
});
