// =======================
// 1. Navigation Active Highlight
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const currentLocation = location.href;
  const menuItems = document.querySelectorAll(".nav-links a");

  menuItems.forEach(item => {
    if (item.href === currentLocation) {
      item.classList.add("active");
    }
  });
});

// =======================
// 2. 3D Hover Effect for Cards
// =======================
const interactiveCards = document.querySelectorAll(".review-card, .category-card, .top10-card");

interactiveCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.3s ease";
  });
});

// =======================
// 3. Scroll Animations (fade-in, slide-up, slide-left)
// =======================
const scrollElements = document.querySelectorAll(".fade-in, .slide-up, .slide-left");

const elementInView = (el, dividend = 1.25) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => element.classList.add("scrolled");
const hideScrollElement = (element) => element.classList.remove("scrolled");

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};
window.addEventListener("scroll", handleScrollAnimation);

// =======================
// 4. Back-to-Top Button
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.createElement("button");
  backToTop.innerText = "⬆ Top";
  backToTop.classList.add("back-to-top");
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// =======================
// 5. Category Filter
// =======================
const filterButtons = document.querySelectorAll(".filter-btn");
const categoryCards = document.querySelectorAll(".category-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    categoryCards.forEach(card => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// =======================
// 6. Star Rating Animation
// =======================
const ratingStars = document.querySelectorAll(".rating");

ratingStars.forEach(star => {
  const text = star.innerText;
  star.innerText = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.innerText = "⭐";
    span.style.transition = `transform 0.3s ease ${i * 0.1}s`;
    span.classList.add("rating-star");
    star.appendChild(span);
  }
});

window.addEventListener("scroll", () => {
  ratingStars.forEach(starContainer => {
    if (elementInView(starContainer, 1.25)) {
      const stars = starContainer.querySelectorAll(".rating-star");
      stars.forEach(s => s.style.transform = "scale(1.2)");
      setTimeout(() => {
        stars.forEach(s => s.style.transform = "scale(1)");
      }, 500);
    }
  });
});

// =======================
// 7. Smooth Scroll for Internal Links
// =======================
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (targetId.startsWith("#")) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// =======================
// 8. Mobile Navbar Toggle (Hamburger Menu)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = "☰";
  toggleBtn.classList.add("menu-toggle");

  const navbar = document.querySelector(".navbar");
  const nav = navbar.querySelector("nav");
  const navLinks = navbar.querySelector(".nav-links");

  if (navbar && nav && navLinks) {
    nav.insertBefore(toggleBtn, navLinks);

    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});
