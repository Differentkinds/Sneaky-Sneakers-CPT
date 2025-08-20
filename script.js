// Basic store data (edit/add products here)
const PRODUCTS = [
  {
    id: "nx-001",
    name: "Nike Air Force 1",
    price: 800,
    category: "sneakers",
    desc: "Lightweight everyday runner with breathable mesh.",
    images: ["images/N.png","images/I.png","images/K.png"]
  },
  {
    id: "nx-002",
    name: "Nike TN",
    price: 1599,
    category: "sneakers",
    desc: "Street-tough boot with padded collar and traction sole.",
    images: ["images/tn1.jfif","images/tn2.jfif","images/tn3.jfif"]
  },
  {
    id: "nx-003",
    name: "Jumpman Two Trey",
    price: 1400,
    category: "sneakers",
    desc: "All-day comfort sandal with cushioned footbed.",
    images: ["images/23.jfif","images/21.jfif","images/22.jfif"]
  },
  {
    id: "nx-004",
    name: "Nike Dunk Panda",
    price: 1399,
    category: "sneakers",
    desc: "Polished oxford for events and the office.",
    images: ["images/p2.jfif","images/p3.jfif","images/p1.jfif"]
  },
  {
    id: "nx-005",
    name: "Adidas Samba",
    price: 1199,
    category: "sneakers",
    desc: "Crisp profile, cushioned midsole, daily comfort.",
    images: ["images/s2.jfif","images/s1.jfif","images/s3.jfif"]
  }
,
  {
    id: "nx-006",
    name: "Jordan 4",
    price: 999,
    category: "sneakers",
    desc: "Iconic shell-toe design with premium leather.",
    images: ["images/j1.jfif","images/j2.jfif","images/j3.jfif"]
  },
  {
    id: "nx-007",
    name: "Jordan Air Jordan 1 High ",
    price: 1299,
    category: "sneakers",
    desc: "Bold style with chunky silhouette and cushioned ride.",
    images: ["images/11.jfif","images/12.jfif","images/13.jfif"]
  },
  {
    id: "nx-008",
    name: "Jordan Jumpman Mvp",
    price: 1400,
    category: "sneakers",
    desc: "Timeless design with soft leather upper.",
    images: ["images/m1.jfif","images/m2.jfif","images/m3.jfif"]
  },
  {
    id: "nx-009",
    name: "Jordan 11",
    price: 750,
    category: "sneakers",
    desc: "Durable canvas with iconic side stripe.",
    images: ["images/a1.jfif","images/a2.jfif","images/a3.jfif"]
  },
  {
    id: "nx-010",
    name: "Jordan 13",
    price: 699,
    category: "sneakers",
    desc: "High-top canvas sneakers with rubber sole.",
    images: ["images/31.jfif","images/32.jfif","images/33.jfif"]
  },
  {
    id: "nx-011",
    name: "Air Jordan 3",
    price: 1499,
    category: "formal",
    desc: "Elegant derby crafted in premium leather.",
    images: ["images/l1.jfif","images/l2.jfif","images/l3.jfif"]
  },
  {
    id: "nx-012",
    name: "Nike Air Max 95",
    price: 1799,
    category: "formal",
    desc: "Classic suede Chelsea boots with elastic side panels.",
    images: ["images/x1.jfif","images/x2.jfif","images/x3.jfif"]
  },
  {
    id: "nx-013",
    name: "Nike Air Max Plus Drift",
    price: 1199,
    category: "sneakers",
    desc: "Minimalist design with soft cushioning.",
    images: ["images/n1.jfif","images/n2.jfif","images/n3.jfif"]
  },
  {
    id: "nx-014",
    name: "Nike Jordan 1 Low",
    price: 1599,
    category: "sneakers",
    desc: "Legendary basketball sneaker reimagined for lifestyle wear.",
    images: ["images/b1.jfif","images/b2.jfif","images/b3.jfif"]
  },
  {
    id: "nx-015",
    name: ".Nike Shox",
    price: 599,
    category: "sneakers",
    desc: "Lightweight clog with all-day comfort.",
    images: ["images/d1.jfif","images/d2.jfif","images/d3"]
  }

];

const UK_SIZES = ["UK3","UK4","UK5","UK6","UK7","UK8","UK9","UK10"];
const WHATSAPP_NUMBER = "27712345678"; // <-- replace with your number (no +)

// Helpers
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));
const money = n => `R${n.toFixed(2)}`;

// Persist cart
const cartStore = (() => {
  let state = JSON.parse(localStorage.getItem("sc_cart") || "[]");
  const save = () => localStorage.setItem("sc_cart", JSON.stringify(state));
  const api = {
    get: () => state,
    add: (item) => { state.push(item); save(); updateCartUI(); },
    remove: (idx) => { state.splice(idx,1); save(); updateCartUI(); },
    clear: () => { state = []; save(); updateCartUI(); },
    total: () => state.reduce((sum,i)=> sum + i.price * i.qty, 0)
  };
  return api;
})();

// Build product cards
function productCard(p) {
  return `
  <article class="card" data-id="${p.id}">
    <span class="badge">${p.category}</span>
    <img src="${p.images[0]}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="price">${money(p.price)}</p>
    <div class="actions">
      <button class="btn ghost" data-open-product>View</button>
      <button class="btn primary" data-quick-add>Add to Cart</button>
    </div>
  </article>`;
}

// Render featured on index
function renderFeatured() {
  const grid = document.getElementById("featured-grid");
  if(!grid) return;
  grid.innerHTML = PRODUCTS.slice(0,4).map(productCard).join("");
}

// Render shop
function renderShop() {
  const grid = document.getElementById("shop-grid");
  if(!grid) return;
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  const apply = () => {
    const q = (searchInput.value || "").toLowerCase();
    const cat = categoryFilter.value;
    const list = PRODUCTS.filter(p => 
      (cat === "all" || p.category === cat) &&
      (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    );
    grid.innerHTML = list.map(productCard).join("") || "<p>No products found.</p>";
  };

  searchInput?.addEventListener("input", apply);
  categoryFilter?.addEventListener("change", apply);
  apply();
}

// Modal logic
const modal = document.querySelector("[data-modal]");
const galleryMain = document.querySelector("[data-gallery-main]");
const thumbs = document.querySelector("[data-thumbs]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalPrice = document.querySelector("[data-modal-price]");
const modalDesc = document.querySelector("[data-modal-desc]");
const sizeSelect = document.querySelector("[data-size]");
let currentProduct = null;

function openModal(p) {
  currentProduct = p;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modalTitle.textContent = p.name;
  modalPrice.textContent = money(p.price);
  modalDesc.textContent = p.desc;
  sizeSelect.value = "";
  buildGallery(p.images);
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
  galleryMain.classList.remove("zoom");
}

function buildGallery(imgs) {
  galleryMain.src = imgs[0];
  thumbs.innerHTML = imgs.map((src, i) => `
    <img src="${src}" data-idx="${i}" class="${i===0?'active':''}" alt="thumb">
  `).join("");
  thumbs.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
      thumbs.querySelectorAll("img").forEach(t => t.classList.remove("active"));
      img.classList.add("active");
      galleryMain.src = img.src;
    });
  });
}

galleryMain?.addEventListener("click", () => galleryMain.classList.toggle("zoom"));
document.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);

// Quick add and view
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if(!card) return;
  const id = card.getAttribute("data-id");
  const product = PRODUCTS.find(p => p.id === id);

  if(e.target.matches("[data-open-product]")) {
    openModal(product);
  }
  if(e.target.matches("[data-quick-add]")) {
    // default to UK7 on quick add
    cartStore.add({ id: product.id, name: product.name, price: product.price, size: "UK7", qty: 1, img: product.images[0] });
    openCart();
  }
});

document.querySelector("[data-add-modal]")?.addEventListener("click", () => {
  if(!currentProduct) return;
  const size = sizeSelect.value;
  if(!size) { alert("Please select a UK size before adding to cart."); return; }
  cartStore.add({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, size, qty: 1, img: currentProduct.images[0] });
  closeModal();
  openCart();
});

// Cart drawer
const cartEl = document.querySelector("[data-cart]");
const cartItemsEl = document.querySelector("[data-cart-items]");
const cartCountEls = qsa("[data-cart-count]");
const cartTotalEl = document.querySelector("[data-cart-total]");
const backdrop = document.querySelector("[data-backdrop]");

function openCart() {
  cartEl?.classList.add("open");
  backdrop?.classList.add("show");
}
function closeCart() {
  cartEl?.classList.remove("open");
  backdrop?.classList.remove("show");
}

document.querySelector("[data-open-cart]")?.addEventListener("click", openCart);
document.querySelector("[data-close-cart]")?.addEventListener("click", closeCart);
backdrop?.addEventListener("click", () => { closeCart(); closeModal(); });

// Update cart UI
function updateCartUI() {
  const list = cartStore.get();
  if(cartItemsEl){
    cartItemsEl.innerHTML = list.map((i, idx) => `
      <div class="cart-item">
        <img src="${i.img}" alt="item">
        <div class="meta">
          <div><strong>${i.name}</strong></div>
          <div>Size: ${i.size}</div>
          <div>Qty: ${i.qty}</div>
        </div>
        <div style="text-align:right">
          <div>${money(i.price * i.qty)}</div>
          <button class="btn ghost" data-remove="${idx}">Remove</button>
        </div>
      </div>
    `).join("") || "<p>Your cart is empty.</p>";
    cartItemsEl.querySelectorAll("[data-remove]").forEach(btn => btn.addEventListener("click", () => {
      cartStore.remove(parseInt(btn.getAttribute("data-remove")));
    }));
  }
  const count = list.length;
  cartCountEls.forEach(el => el.textContent = count);
  if(cartTotalEl) cartTotalEl.textContent = money(cartStore.total());
}

// Checkout via WhatsApp
document.querySelector("[data-checkout]")?.addEventListener("click", () => {
  const items = cartStore.get();
  if(items.length === 0) { alert("Your cart is empty."); return; }
  const lines = items.map(i => `• ${i.name} — Size: ${i.size} x${i.qty} — ${money(i.price * i.qty)}`).join("%0A");
  const total = money(cartStore.total());
  const message = `Hello! I'd like to place an order:%0A${lines}%0A%0ATotal: ${total}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
});

// Page inits
function init() {
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
  renderFeatured();
  renderShop();
  updateCartUI();
}
init();
