// Product and Category Data
const products = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home",
    description:
      "A sleek, adjustable desk lamp with warm lighting perfect for your workspace.",
  },
  {
    id: 2,
    name: "Organic Cotton T-shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    description: "Soft, comfortable t-shirt made from 100% organic cotton.",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    description:
      "Hand-crafted ceramic mug, perfect for your morning coffee or tea.",
  },
  {
    id: 4,
    name: "Wooden Cutting Board",
    price: 35.99,
    image:
      "https://boazstore.com/wp-content/uploads/2021/11/DSC00076-800x578.jpg",
    category: "Kitchen",
    description: "Solid wood cutting board with beautiful grain patterns.",
  },
  {
    id: 5,
    name: "Linen Bed Sheets",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home",
    description:
      "Breathable, soft linen sheets for a comfortable night's sleep.",
  },
  {
    id: 6,
    name: "Natural Fiber Tote Bag",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    description:
      "Durable, eco-friendly tote bag perfect for shopping or daily use.",
  },
  {
    id: 7,
    name: "Stainless Steel Water Bottle",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    description: "Insulated bottle keeps beverages hot or cold for hours.",
  },
  {
    id: 8,
    name: "Wool Knit Sweater",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Clothing",
    description: "Cozy, warm sweater made from premium wool blend.",
  },
];

const categories = [
  {
    id: 1,
    name: "Home",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6affb3fb6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

// DOM elements
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const cartIcon = document.getElementById("cart-icon");
const closeCartBtn = document.getElementById("close-cart");
const continueShopping = document.getElementById("continue-shopping");
const cartSidebar = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");
const yearElement = document.getElementById("current-year");
const productsContainer = document.getElementById("products-container");
const categoriesContainer = document.getElementById("categories-container");

// Cart state
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

// Cart open/close
function openCart() {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  renderCart();
}

function closeCart() {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

cartIcon.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
continueShopping.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});

// Cart functionality
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = count;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }

  saveCart();
  updateCartCount();
  updateCartTotal();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  updateCartTotal();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-top">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">$${(item.price * item.quantity).toFixed(
            2
          )}</p>
        </div>
        <p class="cart-item-category">${item.category}</p>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-button decrease" data-id="${
              item.id
            }">-</button>
            <span class="quantity-count">${item.quantity}</span>
            <button class="quantity-button increase" data-id="${
              item.id
            }">+</button>
          </div>
          <button class="remove-button" data-id="${item.id}">Remove</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Add event listeners to cart items
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = cart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeFromCart(id);
      }
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      const item = cart.find((item) => item.id === id);
      if (item) {
        updateQuantity(id, item.quantity + 1);
      }
    });
  });

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

// Render products
function renderProducts() {
  productsContainer.innerHTML = products
    .map(
      (product) => `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <button class="product-overlay add-to-cart" data-id="${product.id}">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
      <div class="product-details">
        <div class="product-details-top">
          <div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
          </div>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Add event listeners to products
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render categories
function renderCategories() {
  categoriesContainer.innerHTML = categories
    .map(
      (category) => `
    <div class="category-card">
      <img src="${category.image}" alt="${category.name}">
      <div class="category-card-content">
        <h3>${category.name}</h3>
        <a href="#products" class="btn">Shop Now <i class="fas fa-chevron-right"></i></a>
      </div>
    </div>
  `
    )
    .join("");
}

// Initialize
function init() {
  renderProducts();
  renderCategories();
  updateCartCount();
}

// Run initialization
document.addEventListener("DOMContentLoaded", init);
