// ===== STICKY HEADER =====
let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // show after first fold
  if (currentScrollY > 100) {
    header.classList.add("show-header");
  } else {
    header.classList.remove("show-header");
  }

  // hide on scroll down, show on scroll up
  if (currentScrollY > lastScrollY) {
    header.style.transform = "translateY(-100%)"; // hide
  } else {
    header.style.transform = "translateY(0)"; // show
  }

  lastScrollY = currentScrollY;
});


// ===== CAROUSEL =====
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;

    document.querySelector(".thumb.active")?.classList.remove("active");
    thumb.classList.add("active");
  });
});

const images = Array.from(thumbs).map(t => t.src);
let index = 0;

document.querySelector(".next").onclick = () => {
  index = (index + 1) % images.length;
  updateImage();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + images.length) % images.length;
  updateImage();
};

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

  // preview background
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

    // close others
    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    // toggle current
    item.classList.toggle("active");
  });
});