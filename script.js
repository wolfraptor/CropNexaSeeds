const products = {
  "3155": {
    title: "Rainbow 3155",
    crop: "HYBRID MAIZE · 4 KG",
    image: "assets/rainbow-3155-7165.png",
    description: "A Crop Nexa hybrid maize product presented on the supplied pack with a strong focus on yield potential, tillering, disease resistance and grain quality.",
    specs: [["Crop","Maize"],["Class","Hybrid"],["Pack","4 KG"],["Highlights","High yield potential · Better tillering · Disease resistance · Premium grain quality"]]
  },
  "7165": {
    title: "Rainbow 7165",
    crop: "HYBRID MAIZE · 4 KG",
    image: "assets/rainbow-7165.png",
    description: "A Crop Nexa hybrid maize product positioned around strong plant performance, grain quality and harvest-oriented value.",
    specs: [["Crop","Maize"],["Class","Hybrid"],["Pack","4 KG"],["Highlights","High yield potential · Better tillering · Disease resistance · Bold kernels"]]
  },
  "elite-h1": {
    title: "Rainbow Elite H1",
    crop: "HYBRID PADDY · 3 KG",
    image: "assets/rainbow-elite-h1.png",
    description: "A Crop Nexa hybrid paddy product presented with a focus on high yield potential, better tillering, disease resistance and premium grain quality.",
    specs: [["Crop","Paddy"],["Class","Hybrid"],["Pack","3 KG"],["Highlights","High yield potential · Better tillering · Disease resistance · Grain quality"]]
  }
};

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.crop === filter ? "" : "none";
    });
  });
});

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCrop = document.getElementById("modalCrop");
const modalDescription = document.getElementById("modalDescription");
const modalSpecs = document.getElementById("modalSpecs");

function openProduct(key) {
  const p = products[key];
  if (!p) return;
  modalImage.src = p.image;
  modalImage.alt = p.title;
  modalTitle.textContent = p.title;
  modalCrop.textContent = p.crop;
  modalDescription.textContent = p.description;
  modalSpecs.innerHTML = p.specs.map(([k,v]) => `<div class="modal-spec"><span>${k}</span><strong>${v}</strong></div>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeProduct() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".product-details").forEach(btn => btn.addEventListener("click", () => openProduct(btn.dataset.product)));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeProduct));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeProduct(); });

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`Crop Nexa Seeds — ${data.get("type")}`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Mobile: ${data.get("phone")}
Email: ${data.get("email")}
Enquiry: ${data.get("type")}

Message:
${data.get("message")}`
  );
  window.location.href = `mailto:support@cropnexaseeds.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
