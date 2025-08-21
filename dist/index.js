"use strict";
// DOM Elements
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const mainImg = document.getElementById("main-img");
const thumbnails = document.querySelectorAll(".thumbnails");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const countSpan = document.getElementById("count");
const addBtn = document.getElementById("add");
const cartIcon = document.querySelector(".cart-icon");
const cartTotalPriceElem = document.getElementById("cart-total-price");
let isMenuOpen = false;
menuToggle.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        navLinks.classList.add("active");
    }
    else {
        navLinks.classList.remove("active");
    }
});
// Optional: Close menu when clicking outside
document.addEventListener("click", (e) => {
    const target = e.target;
    if (!menuToggle.contains(target) &&
        !navLinks.contains(target) &&
        isMenuOpen) {
        isMenuOpen = false;
        navLinks.classList.remove("active");
    }
});
// Optional: Close menu when clicking on nav links
const navLinksItems = navLinks.querySelectorAll("a");
navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
        isMenuOpen = false;
        navLinks.classList.remove("active");
    });
});
// ======== Product Data ========
const productImages = [
    "./src/images/image-product-1.jpg",
    "./src/images/image-product-2.jpg",
    "./src/images/image-product-3.jpg",
    "./src/images/image-product-4.jpg",
];
const productName = "Fall Limited Edition Sneakers";
const originalPrice = 250;
const discountPercent = 50;
const discountedPrice = originalPrice * (1 - discountPercent / 100);
let currentIndex = 0;
let cartItems = [];
//  Gallery Functions
function updateMainImage(index) {
    mainImg.src = productImages[index];
}
function selectThumbnail(index) {
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle("active-thumb", idx === index);
    });
}
//  Cart Functions
function renderCart() {
    let cartDropdown = document.getElementById("cart-dropdown");
    if (!cartDropdown) {
        cartDropdown = document.createElement("div");
        cartDropdown.id = "cart-dropdown";
        cartDropdown.style.position = "absolute";
        cartDropdown.style.top = "50px";
        cartDropdown.style.right = "0";
        cartDropdown.style.width = "300px";
        cartDropdown.style.background = "#fff";
        cartDropdown.style.border = "1px solid #ccc";
        cartDropdown.style.padding = "10px";
        cartDropdown.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
        cartDropdown.style.zIndex = "1000";
        cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.appendChild(cartDropdown);
    }
    cartDropdown.innerHTML = "";
    if (cartItems.length === 0) {
        cartDropdown.innerHTML = "<p>Your cart is empty.</p>";
        if (cartTotalPriceElem)
            cartTotalPriceElem.textContent = "$0.00";
        return;
    }
    let totalPrice = 0;
    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        const itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.marginBottom = "10px";
        itemDiv.innerHTML = `
      <span>${item.name}</span>
      <button class="decrease">-</button>
      <span>${item.quantity}</span>
      <button class="increase">+</button>
      <span>$${item.price * item.quantity}</span>
      <span class="remove" style="cursor:pointer;">🗑️</span>
    `;
        cartDropdown.appendChild(itemDiv);
    });
    const totalDiv = document.createElement("div");
    totalDiv.style.borderTop = "1px solid #ccc";
    totalDiv.style.paddingTop = "10px";
    totalDiv.style.textAlign = "right";
    totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    cartDropdown.appendChild(totalDiv);
    if (cartTotalPriceElem)
        cartTotalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
    const removeBtns = cartDropdown.querySelectorAll(".remove-btn");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id || "0");
            cartItems = cartItems.filter((item) => item.id !== id);
            renderCart();
        });
    });
}
//  Event Listeners
// Thumbnails click
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        currentIndex = index;
        updateMainImage(currentIndex);
        selectThumbnail(currentIndex);
    });
});
// Prev/Next buttons
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + productImages.length) % productImages.length;
    updateMainImage(currentIndex);
    selectThumbnail(currentIndex);
});
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % productImages.length;
    updateMainImage(currentIndex);
    selectThumbnail(currentIndex);
});
// Quantity counter
decrementBtn.addEventListener("click", () => {
    let current = parseInt(countSpan.innerText);
    if (current > 0)
        countSpan.innerText = (current - 1).toString();
});
incrementBtn.addEventListener("click", () => {
    let current = parseInt(countSpan.innerText);
    countSpan.innerText = (current + 1).toString();
});
// Add to cart
addBtn.addEventListener("click", () => {
    const qty = parseInt(countSpan.innerText);
    if (qty > 0) {
        const existingItem = cartItems.find((item) => item.id === 1);
        if (existingItem) {
            existingItem.quantity += qty;
        }
        else {
            cartItems.push({
                id: 1,
                name: productName,
                price: discountedPrice,
                quantity: qty,
                image: productImages[0],
            });
        }
        countSpan.innerText = "0";
        renderCart();
    }
});
// Toggle cart dropdown
cartIcon === null || cartIcon === void 0 ? void 0 : cartIcon.addEventListener("click", () => {
    const cartDropdown = document.getElementById("cart-dropdown");
    if (cartDropdown) {
        cartDropdown.style.display =
            cartDropdown.style.display === "none" ? "block" : "none";
    }
    else {
        renderCart();
    }
});
// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// Lightbox
mainImg.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.position = "fixed";
    lightbox.style.top = "0";
    lightbox.style.left = "0";
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.background = "rgba(0,0,0,0.8)";
    lightbox.style.display = "flex";
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightbox.style.zIndex = "1000";
    const img = document.createElement("img");
    img.src = mainImg.src;
    img.style.maxWidth = "80%";
    img.style.maxHeight = "80%";
    img.style.borderRadius = "10px";
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => {
        lightbox.remove();
    });
});
