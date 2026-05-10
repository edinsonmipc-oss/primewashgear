/* ============================================================
   PrimeWash Gear Australia — Main JavaScript
   Cart, toast, mobile nav, product rendering
   Stripe LIVE Integration
   ============================================================ */

// Stripe LIVE Keys
const STRIPE_PK = 'pk_live_51TTejULCGSIdPF8kPhsYvgfbI8eOE6OL6qG5vQ0BeaJWiKQWRtEe0NQjjvkJQvZuDf10wWmvGOl974HQCa2YNVmp00Fyj5Ce8s';

// Payment Links LIVE
const PAYMENT_LINKS = {
  'bundle-pro':        'https://buy.stripe.com/cNifZi4Tx8CdeDZ2laeUU00',
  'bundle-starter':    'https://buy.stripe.com/4gM14o99NdWxgM7e3SeUU01',
  'bundle-maintenance':'https://buy.stripe.com/28E6oI3Pt7y92VhbVKeUU02'
};

// ============================================================
// PRODUCT DATA — 6 Top Products + 3 Bundles
// ============================================================

const products = [
  {
    id: 1, name: 'Turbo Nozzle / Rotary Jet Nozzle (Universal)',
    price: 19.99, oldPrice: null,
    category: 'nozzles',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S6ed4cbab10b54397bd45040e94440d93u.jpg_480x480q75.jpg_.avif',
    rating: 4.8, reviews: 521,
    tag: 'bestseller',
    brand: 'PrimeWash',
    desc: 'Rotary jet blasts away stubborn dirt, grease & grime. Compatible with most AU pressure washers (Karcher K2–K7, Gerni, Bosch, Ryobi). Ideal for concrete, brick, driveways & paving.',
    compatibility: 'Karcher K2–K7, Gerni, Bosch, Ryobi, Ozito & universal 1/4" quick connect'
  },
  {
    id: 2, name: 'Foam Cannon / Snow Foam Lance (1L)',
    price: 29.99, oldPrice: 39.99,
    category: 'foam',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/S33bb8f75704c4b7f922ce6f029ca9964Y.jpg_480x480q75.jpg_.avif',
    rating: 4.7, reviews: 408,
    tag: 'bestseller',
    brand: 'PrimeWash',
    desc: 'Professional-grade snow foam cannon. Produces thick, clinging foam that lifts dirt before you rinse. 1L capacity — enough for 2 cars or one patio. Adjustable spray pattern.',
    compatibility: 'Universal 1/4" quick connect — fits most high-pressure washers'
  },
  {
    id: 3, name: '5-in-1 Quick Connect Nozzle Set',
    price: 14.99, oldPrice: 19.99,
    category: 'nozzles',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sfdddddb03f474f31bee075bee6b39944m.png_480x480.png_.avif',
    rating: 4.6, reviews: 342,
    tag: 'bestseller',
    brand: 'PrimeWash',
    desc: 'Five nozzles in one set — 0°, 15°, 25°, 40° and soap tip. Colour-coded for easy identification. Swap tips in seconds with quick-connect. Covers every job from tough concrete cleaning to delicate car washing.',
    compatibility: 'Universal 1/4" quick connect — fits all standard pressure washers'
  },
  {
    id: 4, name: 'Surface Cleaner / Patio Cleaner (12")',
    price: 45.00, oldPrice: null,
    category: 'cleaners',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sb9a02f751d674924850f8452f60f5c9aH.jpg_480x480q75.jpg_.avif',
    rating: 4.6, reviews: 198,
    tag: '',
    brand: 'PrimeWash',
    desc: '12-inch rotary surface cleaner. Eliminates wash-out marks and speeds up patio/driveway cleaning by 3x. Dual high-pressure jets spin for streak-free results. Non-mark wheels protect surfaces.',
    compatibility: 'Universal — fits 1/4" quick connect pressure washers up to 4000 PSI'
  },
  {
    id: 5, name: '15m Heavy Duty Hose (Steel Braided)',
    price: 44.99, oldPrice: 59.99,
    category: 'hoses',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sdfb35b507709446cb0a2975068d53069d.png_480x480.png_.avif',
    rating: 4.7, reviews: 176,
    tag: 'bestseller',
    brand: 'PrimeWash',
    desc: 'Steel-braided reinforced hose rated to 4000 PSI. 15m length gives you full reach around the average Aussie home. Kink-resistant, abrasion-resistant outer layer. Brass fittings included.',
    compatibility: 'Universal M22 14mm & 15mm — adapters included for Karcher, Gerni, Bosch'
  },
  {
    id: 6, name: 'O-Ring & Seal Kit (100+ Piece)',
    price: 14.99, oldPrice: null,
    category: 'maintenance',
    image: 'https://ae-pic-a1.aliexpress-media.com/kf/Sb7f6dd6f36ab431db1c9c1904ba9791eP.png_960x960.png_.avif',
    rating: 4.4, reviews: 115,
    tag: '',
    brand: 'PrimeWash',
    desc: '100+ piece nitrile rubber o-ring assortment. Covers every common size for pressure washers, taps, hoses and fittings. Stop leaks before they start — cheap insurance that saves your pump.',
    compatibility: 'Universal — fits all major brands including Karcher, Gerni, Bosch, Honda, Ryobi'
  }
];

const bundles = [
  {
    id: 'bundle-starter',
    name: 'Starter Kit',
    price: 99.00,
    originalTotal: 159.94,
    savings: 38,
    items: [
      '5-in-1 Quick Connect Nozzle Set',
      'Turbo Nozzle / Rotary Jet Nozzle',
      'Brass Quick Connect Coupler Set',
      '10m High Pressure Replacement Hose',
      'Universal Spray Gun with Safety Lock'
    ],
    icon: '🚀',
    featured: false,
    subtitle: 'Everything a tradie needs to get started. Perfect for apprentices or new gear setups.',
    stripeUrl: 'https://buy.stripe.com/4gM14o99NdWxgM7e3SeUU01'
  },
  {
    id: 'bundle-maintenance',
    name: 'Maintenance Pack',
    price: 44.99,
    originalTotal: 62.46,
    savings: 28,
    items: [
      'High-Pressure Pump Oil (1L)',
      'Inlet Water Filter Set (5-pack)',
      'O-Ring & Seal Kit (100+ Piece)'
    ],
    icon: '🔧',
    featured: false,
    subtitle: 'Keep your pressure washer running for years. Do this every 3 months.',
    stripeUrl: 'https://buy.stripe.com/28E6oI3Pt7y92VhbVKeUU02'
  },
  {
    id: 'bundle-pro',
    name: 'Pro Pack',
    price: 174.99,
    originalTotal: 397.72,
    savings: 56,
    items: [
      'Turbo Nozzle / Rotary Jet Nozzle',
      'Foam Cannon / Snow Foam Lance (1L)',
      '15m Heavy Duty Hose (Steel Braided)',
      'Brass Quick Connect Set (10-pack Bulk)',
      'Surface Cleaner / Patio Cleaner (12")',
      'Professional Grade Wash Brush'
    ],
    icon: '💪',
    featured: true,
    subtitle: 'The full arsenal. Everything a pro tradie needs on site. Save $222.',
    stripeUrl: 'https://buy.stripe.com/cNifZi4Tx8CdeDZ2laeUU00'
  }
];

// ============================================================
// CART
// ============================================================

let cart = JSON.parse(localStorage.getItem('primewashCart')) || [];

function saveCart() {
  localStorage.setItem('primewashCart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('#cartCount');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(el => { el.textContent = count; });
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  showToast(`✓ ${name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ============================================================
// STRIPE CHECKOUT — BUY NOW
// ============================================================

function buyBundle(bundleId) {
  const link = PAYMENT_LINKS[bundleId];
  if (link) {
    showToast('🔒 Redirecting to secure checkout...');
    setTimeout(() => { window.location.href = link; }, 500);
  }
}

function buyNow(url) {
  showToast('🔒 Redirecting to secure checkout...');
  setTimeout(() => { window.location.href = url; }, 500);
}

// Individual items checkout — opens contact dialog
function checkoutIndividualItems() {
  const total = getCartTotal();
  const items = cart.map(i => `• ${i.name} x${i.qty}`).join('\n');
  const msg = encodeURIComponent(
    `Hi PrimeWash Gear! I'd like to buy:\n${items}\n\nTotal: $${total.toFixed(2)}\n\nPlease send me an invoice or let me know how to pay. Thanks!`
  );
  // Offer both email and SMS
  const choice = confirm(
    `🛒 Requesting invoice for:\n${items}\n\nTotal: $${total.toFixed(2)}\n\n• Click OK to send via SMS (0406 170 544)\n• Click Cancel to send via email`
  );
  if (choice) {
    window.location.href = `sms:0406170544?body=${msg}`;
  } else {
    window.location.href = `mailto:antoniolandscapingman@gmail.com?subject=Order%20Inquiry%20-%20PrimeWash%20Gear&body=${msg}`;
  }
}

// ============================================================
// CART RENDER
// ============================================================

function renderCart() {
  const container = document.getElementById('cartContainer');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any gear yet, mate.</p>
        <a href="shop.html" class="btn btn-accent">Shop Now →</a>
      </div>`;
    return;
  }

  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 9.95;
  const itemsHtml = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHtml}</div>
      <div class="cart-summary" id="cartSummary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>$${total.toFixed(2)}</span></div>
        <div class="summary-row ${shipping === 0 ? 'free' : ''}">
          <span>Shipping</span>
          <span>${shipping === 0 ? '🚚 FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        ${total < 50 ? '<div class="summary-row" style="font-size:12px;color:var(--gray-400);">Add $' + (50 - total).toFixed(2) + ' more for free shipping</div>' : ''}
        <div class="summary-row total"><span>Total</span><span>$${(total + shipping).toFixed(2)}</span></div>
        <button class="checkout-btn" onclick="checkoutIndividualItems()">
          📞 Request Invoice / Checkout →
        </button>
        <div style="margin-top:12px;padding:12px;background:#fef3c7;border-radius:8px;font-size:13px;text-align:center;color:#92400e;">
          ⚡ <strong>Pro tip:</strong> Our <a href="shop.html#bundles" style="color:#2563eb;font-weight:600;">bundles</a> are ready to buy now with instant checkout!
        </div>
        <div class="payment-icons">
          <span>💳 Visa/MC</span>
          <span>📱 Afterpay</span>
          <span>⚡ Zip Pay</span>
          <span>🍏 Apple Pay</span>
          <span>💰 Google Pay</span>
        </div>
        <div style="margin-top:12px;padding:12px;background:#f0fdf4;border-radius:8px;font-size:12px;color:#166534;text-align:center;">
          🔒 30-Day Guarantee • Free returns • Ships from Melbourne
        </div>
        <div style="margin-top:16px;padding:12px;background:var(--gray-800);border-radius:8px;text-align:center;">
          <p style="font-size:13px;color:var(--gray-400);margin-bottom:8px;">⚡ Want the best deal?</p>
          <a href="shop.html" class="btn btn-accent" style="font-size:14px;">View Bundles — Save Up to 56%</a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// TOAST
// ============================================================

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; }, 3000);
  setTimeout(() => toast.remove(), 3500);
}

// ============================================================
// MOBILE NAV
// ============================================================

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ============================================================
// CONTACT FORM
// ============================================================

function submitContactForm(form) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const subject = form.subject.value;
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Build mailto fallback
  const emailSubject = encodeURIComponent(`PrimeWash Gear Inquiry: ${subject || 'General'}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject || 'General'}\n\nMessage:\n${message}`
  );
  const mailto = `mailto:antoniolandscapingman@gmail.com?subject=${emailSubject}&body=${body}`;

  // Try to open default email client
  const successEl = document.getElementById('formSuccess');
  const errorEl = document.getElementById('formError');
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  // Open email client
  window.location.href = mailto;

  // Show success
  successEl.style.display = 'block';
  form.reset();

  // Also copy to clipboard as backup
  const textToCopy = `To: antoniolandscapingman@gmail.com\nSubject: PrimeWash Gear Inquiry: ${subject || 'General'}\n\n${body}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  }
}

// ============================================================
// SHOP PAGE: RENDER PRODUCTS
// ============================================================

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '½';
  s += '☆'.repeat(5 - full - (half ? 1 : 0));
  return s;
}

function renderProductCard(p) {
  const tagHtml = p.tag ? `<span class="tag tag-${p.tag}">🔥 Best Seller</span>` : '';
  const oldPriceHtml = p.oldPrice ? `<span class="product-price-old">$${p.oldPrice.toFixed(2)}</span>` : '';
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-tags">${tagHtml}</div>
        <div class="product-actions">
          <button class="product-action-btn" onclick="addToCart(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})" title="Add to Cart">🛒</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc-short">${p.desc.substring(0, 70)}…</div>
        <div class="product-rating">
          <span class="product-stars">${renderStars(p.rating)}</span>
          <span class="product-reviews">(${p.reviews})</span>
        </div>
        <div class="product-price-wrap">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          ${oldPriceHtml}
        </div>
        <button class="product-add-btn" onclick="addToCart(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderBundles() {
  const grids = document.querySelectorAll('#bundlesGrid');
  grids.forEach(grid => {
    grid.innerHTML = bundles.map(b => {
      const savingsPct = b.savings;
      const itemsHtml = b.items.map((item, i) => {
        const icons = [b.icon, b.icon, b.icon, b.icon, b.icon, b.icon];
        return `
          <div class="bundle-item">
            <div class="bundle-item-icon">${icons[i] || b.icon}</div>
            <span>${item}</span>
          </div>
        `;
      }).join('');
      return `
        <div class="bundle-card ${b.featured ? 'featured' : ''}">
          ${b.featured ? '<div class="bundle-badge">⭐ MOST POPULAR</div>' : ''}
          <div class="bundle-body">
            <div class="bundle-header">
              <div>
                <h3 class="bundle-title">${b.icon} ${b.name}</h3>
                <p class="bundle-subtitle">${b.subtitle}</p>
              </div>
              <div class="bundle-price-col">
                <div class="bundle-price">$${b.price.toFixed(2)}</div>
                <div class="bundle-was">Was $${b.originalTotal.toFixed(2)}</div>
                <div class="bundle-savings">Save ${savingsPct}%</div>
              </div>
            </div>
            <div class="bundle-items">${itemsHtml}</div>
            <div class="bundle-value">
              💰 <strong>Worth $${b.originalTotal.toFixed(2)}</strong> — You pay <strong>$${b.price.toFixed(2)}</strong>
            </div>
            <button class="btn btn-accent bundle-cta" onclick="buyNow('${b.stripeUrl}')">
              🛒 Buy Now — $${b.price.toFixed(2)}
            </button>
            <div class="payment-icons" style="margin-top:8px;gap:4px;flex-wrap:wrap;">
              <span style="font-size:11px;">💳 Cards</span>
              <span style="font-size:11px;">📱 Afterpay</span>
              <span style="font-size:11px;">⚡ Zip</span>
              <span style="font-size:11px;">🍏 Apple Pay</span>
              <span style="font-size:11px;">💰 Google Pay</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  });
}

function renderFeatured() {
  const grid = document.getElementById('featuredProducts');
  if (!grid) return;
  grid.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
}

function initShop() {
  renderBundles();
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(renderProductCard).join('');
  const count = document.getElementById('productCount');
  if (count) count.textContent = products.length + bundles.length;
}

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderBundles();
  renderFeatured();
  initShop();
  if (document.getElementById('cartContainer')) renderCart();
});
