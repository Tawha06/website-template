// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// REVEAL ON SCROLL
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// HERO TILT (subtle)
const card = document.getElementById("tiltCard");
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

// MOBILE MENU
const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menuBtn");
const drawerClose = document.getElementById("drawerClose");

function openDrawer(){
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function closeDrawer(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

if (menuBtn && drawer && drawerClose) {
  menuBtn.addEventListener("click", openDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
}

// SHOWROOM TABS + COPY
const tabs = document.querySelectorAll(".tab");
const demos = document.querySelectorAll(".demo");

const title = document.getElementById("demoTitle");
const heading = document.getElementById("demoHeading");
const desc = document.getElementById("demoDesc");
const bullets = document.getElementById("demoBullets");
const underline = document.getElementById("tabUnderline");

const copy = {
  web: {
    t: "Website Demo",
    h: "Websites that feel premium",
    d: "Smooth motion, clean spacing, and a conversion-first layout — inspired by modern tech brands.",
    b: [
      "✔ Smooth scroll reveal + transitions",
      "✔ Brand-matched gradients (your colours)",
      "✔ Clean layout built for enquiries",
    ],
  },
  logo: {
    t: "Logo Demo",
    h: "Branding that looks legit everywhere",
    d: "Modern logos that pop on Google, socials, uniforms, invoices — clean, simple, memorable.",
    b: [
      "✔ Icon + wordmark versions",
      "✔ Profile-ready exports",
      "✔ Colours matched to your vibe",
    ],
  },
  app: {
    t: "Small App Demo",
    h: "Tools that save time",
    d: "Mini apps + automation (quotes, templates, dashboards) that speed up your business workflow.",
    b: [
      "✔ Auto-fill documents/templates",
      "✔ Simple dashboards & forms",
      "✔ Built around your process",
    ],
  },
};

function setUnderlineTo(btn){
  if (!underline || !btn) return;
  const rect = btn.getBoundingClientRect();
  const parentRect = btn.parentElement.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  underline.style.transform = `translateX(${left}px)`;
  underline.style.width = `${rect.width}px`;
}

function setDemo(key){
  // tabs
  tabs.forEach(t => {
    const active = t.dataset.demo === key;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active ? "true" : "false");
  });

  // demos
  demos.forEach(d => d.classList.toggle("active", d.classList.contains(`demo-${key}`)));

  // copy
  const c = copy[key];
  if (title) title.textContent = c.t;
  if (heading) heading.textContent = c.h;
  if (desc) desc.textContent = c.d;
  if (bullets) bullets.innerHTML = c.b.map(x => `<div class="bullet">${x}</div>`).join("");

  // underline
  const activeBtn = Array.from(tabs).find(t => t.dataset.demo === key);
  setUnderlineTo(activeBtn);
}

tabs.forEach(btn => {
  btn.addEventListener("click", () => setDemo(btn.dataset.demo));
});

// initial underline
window.addEventListener("load", () => setUnderlineTo(document.querySelector(".tab.active")));
window.addEventListener("resize", () => setUnderlineTo(document.querySelector(".tab.active")));

// LEGAL MODAL (Privacy / Terms / Refunds)
const legalModal = document.getElementById("legalModal");
const legalTitle = document.getElementById("legalTitle");
const legalBody = document.getElementById("legalBody");
const legalClose = document.getElementById("legalClose");
const legalOk = document.getElementById("legalOk");

const legalCopy = {
  privacy: {
    title: "Privacy Policy (Summary)",
    body: `
      <p>This is a simple summary for a small business website. If you later use a legal-generator app, you can replace this text.</p>
      <h4>What we collect</h4>
      <ul>
        <li>Contact form details you submit (name, email, message).</li>
        <li>Basic analytics data (if enabled) like page visits and device type.</li>
      </ul>
      <h4>How we use it</h4>
      <ul>
        <li>To respond to enquiries and provide quotes.</li>
        <li>To improve site performance and user experience (analytics).</li>
      </ul>
      <h4>Sharing</h4>
      <ul>
        <li>We do not sell your data.</li>
        <li>Form submissions may be processed by Formspree (contact form provider).</li>
      </ul>
      <p class="tiny muted">Last updated: ${new Date().getFullYear()}</p>
    `
  },
  terms: {
    title: "Terms of Service (Summary)",
    body: `
      <p>By using this website or engaging Lumero Digital, you agree to these general terms.</p>
      <h4>Services</h4>
      <ul>
        <li>We provide website, branding, and small app development services based on agreed scope.</li>
        <li>Timeframes and pricing depend on requirements and will be confirmed in writing.</li>
      </ul>
      <h4>Content & approvals</h4>
      <ul>
        <li>Clients are responsible for providing accurate business info and approvals.</li>
        <li>Delays in content/approvals may delay delivery.</li>
      </ul>
      <h4>Liability</h4>
      <ul>
        <li>We don’t guarantee business outcomes (sales/leads), only deliver the agreed work.</li>
      </ul>
      <p class="tiny muted">Last updated: ${new Date().getFullYear()}</p>
    `
  },
  refund: {
    title: "Refund Policy (Summary)",
    body: `
      <p>We keep it fair and clear.</p>
      <h4>Deposits</h4>
      <ul>
        <li>Deposits are generally non-refundable once work has started (time has been allocated).</li>
      </ul>
      <h4>Refunds</h4>
      <ul>
        <li>Refunds may apply if we do not deliver the agreed scope within a reasonable time and cannot fix it.</li>
      </ul>
      <h4>Scope changes</h4>
      <ul>
        <li>Extra features not in scope will be quoted separately.</li>
      </ul>
      <p class="tiny muted">Last updated: ${new Date().getFullYear()}</p>
    `
  }
};

function openLegal(key){
  if (!legalModal) return;
  const c = legalCopy[key];
  if (!c) return;

  legalTitle.textContent = c.title;
  legalBody.innerHTML = c.body;

  legalModal.showModal();
}

document.querySelectorAll(".legal-link").forEach(btn => {
  btn.addEventListener("click", () => openLegal(btn.dataset.legal));
});

function closeLegal(){
  if (legalModal && legalModal.open) legalModal.close();
}
if (legalClose) legalClose.addEventListener("click", closeLegal);
if (legalOk) legalOk.addEventListener("click", closeLegal);
if (legalModal) legalModal.addEventListener("click", (e) => {
  // close when clicking outside the card
  const rect = legalModal.querySelector(".legal-card")?.getBoundingClientRect();
  if (!rect) return;
  const inCard = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inCard) closeLegal();
});
