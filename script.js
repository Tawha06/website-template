// year
document.getElementById("year").textContent = new Date().getFullYear();

// reveal on scroll
const els = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

els.forEach(el => io.observe(el));

// tiny 3d tilt on hero card (subtle apple-ish)
const card = document.querySelector(".card3d");
if (card) {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(y * -8) + 6}deg) rotateY(${(x * 10) - 8}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(6deg) rotateY(-8deg)";
  });
}
// SHOWROOM tabs
const tabs = document.querySelectorAll(".tab");
const demos = {
  web: document.querySelector(".demo-web"),
  logo: document.querySelector(".demo-logo"),
  app: document.querySelector(".demo-app"),
};

const title = document.getElementById("demoTitle");
const heading = document.getElementById("demoHeading");
const desc = document.getElementById("demoDesc");
const bullets = document.getElementById("demoBullets");

const copy = {
  web: {
    t: "Website Demo",
    h: "Transitions that feel expensive",
    d: "Smooth reveals, subtle tilt, and clean spacing — like premium tech sites. This is the look clients remember.",
    b: [
      "✔ Scroll reveal + smooth motion",
      "✔ Premium gradients (matches your logo)",
      "✔ Clean layout for pricing & services",
    ],
  },
  logo: {
    t: "Logo Demo",
    h: "Branding that looks premium everywhere",
    d: "Logos designed to pop on Google, Instagram, and your website — clean, modern, and memorable.",
    b: [
      "✔ Icon + wordmark versions",
      "✔ Profile-ready sizes",
      "✔ Colours matched to your vibe",
    ],
  },
  app: {
    t: "Small App Demo",
    h: "Simple tools that save time",
    d: "Mini apps + automation (like quote/template generators) that make your business faster and cleaner.",
    b: [
      "✔ Auto-fill documents/templates",
      "✔ Simple dashboards & forms",
      "✔ Built to fit your workflow",
    ],
  },
};

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    btn.classList.add("active");

    const k = btn.dataset.demo;

    Object.values(demos).forEach(el => el.classList.remove("active"));
    demos[k].classList.add("active");

    title.textContent = copy[k].t;
    heading.textContent = copy[k].h;
    desc.textContent = copy[k].d;
    bullets.innerHTML = copy[k].b.map(x => `<div class="bullet">${x}</div>`).join("");
  });
});

