// ===== STICKY HEADER =====
let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    header.classList.add("show-header");
  } else {
    header.classList.remove("show-header");
  }

  if (currentScrollY > lastScrollY) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
});


// ===== CAROUSEL =====
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// images array
const images = Array.from(thumbs).map(t => t.src);
let index = 0;

// thumbnail click
thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;
    index = i; // 🔥 FIX

    document.querySelector(".thumb.active")?.classList.remove("active");
    thumb.classList.add("active");
  });
});

// next button
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 FIX
  index = (index + 1) % images.length;
  updateImage();
});

// prev button
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 FIX
  index = (index - 1 + images.length) % images.length;
  updateImage();
});

// update image
function updateImage() {
  mainImage.src = images[index];

  document.querySelector(".thumb.active")?.classList.remove("active");
  thumbs[index].classList.add("active");
}


// ===== ZOOM FUNCTIONALITY =====
const img = document.getElementById("mainImage");
const lens = document.querySelector(".zoom-lens");
const preview = document.getElementById("zoomPreview");

img.addEventListener("mouseenter", () => {
  lens.style.display = "block";
  preview.style.display = "block";
});

img.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  preview.style.display = "none";
});

img.addEventListener("mousemove", moveLens);

function moveLens(e) {
  const rect = img.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  const lensSize = lens.offsetWidth / 2;

  x = Math.max(lensSize, Math.min(x, rect.width - lensSize));
  y = Math.max(lensSize, Math.min(y, rect.height - lensSize));

  lens.style.left = (x - lensSize) + "px";
  lens.style.top = (y - lensSize) + "px";

  preview.style.backgroundImage = `url(${img.src})`;

  const zoomLevel = 2;

  preview.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;

  preview.style.backgroundPosition =
    `-${(x * zoomLevel) - preview.offsetWidth / 2}px 
     -${(y * zoomLevel) - preview.offsetHeight / 2}px`;
}


// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const item = q.parentElement;

    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


// ===== APPLICATIONS SLIDER =====
const slider = document.querySelector(".app-slider");
const appNext = document.querySelector(".app-next");
const appPrev = document.querySelector(".app-prev");

appNext?.addEventListener("click", () => {
  slider.scrollBy({ left: 420, behavior: "smooth" });
});

appPrev?.addEventListener("click", () => {
  slider.scrollBy({ left: -420, behavior: "smooth" });
});

const modal = document.getElementById("datasheetModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-btn");

// OPEN
openBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

// CLOSE (X button)
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// CLOSE when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});


const quoteModal = document.getElementById("quoteModal");
const openQuoteBtn = document.getElementById("openQuoteModal");
const closeQuoteBtn = document.querySelector(".close-quote");

// OPEN
openQuoteBtn.addEventListener("click", () => {
  quoteModal.classList.add("show");
});

// CLOSE (X)
closeQuoteBtn.addEventListener("click", () => {
  quoteModal.classList.remove("show");
});

// CLOSE ON OUTSIDE CLICK
window.addEventListener("click", (e) => {
  if (e.target === quoteModal) {
    quoteModal.classList.remove("show");
  }
});


const productBar = document.getElementById("productBar");

let lastScroll = 0;

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;

  if (currentScroll > 100) {
    // SCROLL DOWN → HIDE HEADER
    if (currentScroll > lastScroll) {
      header.classList.add("hide");
      productBar.classList.add("sticky-top"); // move up
    } 
    // SCROLL UP → SHOW HEADER
    else {
      header.classList.remove("hide");
      productBar.classList.remove("sticky-top"); // back below header
    }
  }

  lastScroll = currentScroll;
});