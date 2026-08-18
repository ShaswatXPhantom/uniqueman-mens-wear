// Uniqueman Men's Wear - Core App Logic
const STORAGE_KEYS = {
  products: 'um_products',
  users: 'um_users',
  session: 'um_session',
  wishlist: 'um_wishlist',
  bookings: 'um_bookings'
};

// Sample products for Uniqueman Men's Wear (Delhi based exclusive outlet)
const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Classic Oxford Shirt',
    category: 'Shirts',
    price: 1299,
    originalPrice: 1599,
    stock: 24,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    description: 'Premium cotton oxford shirt with button-down collar. Perfect for formal and smart-casual looks.',
    badge: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Slim Fit Chino Trousers',
    category: 'Trousers',
    price: 1499,
    originalPrice: 1899,
    stock: 18,
    sizes: ['28', '30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    description: 'Comfortable stretch chino trousers in versatile beige. Ideal for everyday wear.',
    badge: null
  },
  {
    id: 'p3',
    name: 'Linen Summer Shirt',
    category: 'Shirts',
    price: 999,
    originalPrice: 1299,
    stock: 8,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
    description: 'Breathable pure linen shirt for Delhi summers. Light and stylish.',
    badge: 'Low Stock'
  },
  {
    id: 'p4',
    name: 'Premium Denim Jacket',
    category: 'Jackets',
    price: 2499,
    originalPrice: 2999,
    stock: 12,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    description: 'Classic denim jacket with modern wash. Layer it over any outfit.',
    badge: 'New'
  },
  {
    id: 'p5',
    name: 'Formal Black Trousers',
    category: 'Trousers',
    price: 1699,
    originalPrice: null,
    stock: 30,
    sizes: ['28', '30', '32', '34', '36', '38'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
    description: 'Sharp formal trousers for office and events. Wrinkle-resistant fabric.',
    badge: null
  },
  {
    id: 'p6',
    name: 'Casual Polo T-Shirt',
    category: 'T-Shirts',
    price: 799,
    originalPrice: 999,
    stock: 45,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    description: 'Soft pique cotton polo. Available in multiple colors.',
    badge: null
  },
  {
    id: 'p7',
    name: 'Wool Blend Blazer',
    category: 'Jackets',
    price: 3999,
    originalPrice: 4599,
    stock: 6,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop',
    description: 'Sophisticated wool-blend blazer for special occasions and winter.',
    badge: 'Exclusive'
  },
  {
    id: 'p8',
    name: 'Cargo Utility Pants',
    category: 'Trousers',
    price: 1799,
    originalPrice: 2199,
    stock: 15,
    sizes: ['30', '32', '34', '36'],
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop',
    description: 'Functional cargo pants with multiple pockets. Street-style ready.',
    badge: null
  },
  {
    id: 'p9',
    name: 'Mandarin Collar Shirt',
    category: 'Shirts',
    price: 1199,
    originalPrice: 1499,
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&h=500&fit=crop',
    description: 'Modern mandarin collar shirt in soft cotton. Indo-western vibes.',
    badge: 'Popular'
  },
  {
    id: 'p10',
    name: 'Graphic Print Tee',
    category: 'T-Shirts',
    price: 599,
    originalPrice: 799,
    stock: 0,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    description: 'Bold graphic print t-shirt. Limited edition design.',
    badge: 'Sold Out'
  },
  {
    id: 'p11',
    name: 'Leather Belt Classic',
    category: 'Accessories',
    price: 899,
    originalPrice: null,
    stock: 40,
    sizes: ['32', '34', '36', '38', '40'],
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=400&h=500&fit=crop',
    description: 'Genuine leather belt with matte buckle. Everyday essential.',
    badge: null
  },
  {
    id: 'p12',
    name: 'Winter Quilted Jacket',
    category: 'Jackets',
    price: 2799,
    originalPrice: 3299,
    stock: 10,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1544923246-77307dd62870?w=400&h=500&fit=crop',
    description: 'Warm quilted jacket for Delhi winters. Lightweight yet cozy.',
    badge: 'New'
  }
];

// Admin credentials (demo)
const ADMIN = {
  email: 'admin@uniqueman.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin'
};

// ===== Storage Helpers =====
function getFromStorage(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Initialize data
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    saveToStorage(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    // Seed with admin
    saveToStorage(STORAGE_KEYS.users, [{
      id: 'u_admin',
      email: ADMIN.email,
      password: ADMIN.password, // plain for demo only
      name: ADMIN.name,
      role: 'admin',
      createdAt: new Date().toISOString()
    }]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.bookings)) {
    saveToStorage(STORAGE_KEYS.bookings, []);
  }
  if (!localStorage.getItem(STORAGE_KEYS.wishlist)) {
    saveToStorage(STORAGE_KEYS.wishlist, {});
  }
}

// ===== Auth =====
function getSession() {
  return getFromStorage(STORAGE_KEYS.session, null);
}

function setSession(user) {
  if (user) {
    const { password, ...safe } = user;
    saveToStorage(STORAGE_KEYS.session, safe);
  } else {
    localStorage.removeItem(STORAGE_KEYS.session);
  }
}

function isLoggedIn() {
  return !!getSession();
}

function isAdmin() {
  const s = getSession();
  return s && s.role === 'admin';
}

function login(email, password) {
  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    setSession(user);
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password' };
}

function register(name, email, password) {
  const users = getFromStorage(STORAGE_KEYS.users);
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }
  const newUser = {
    id: 'u_' + Date.now(),
    name,
    email,
    password,
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.users, users);
  setSession(newUser);
  return { success: true, user: newUser };
}

function logout() {
  setSession(null);
  window.location.href = 'index.html';
}

// ===== Products =====
function getProducts() {
  return getFromStorage(STORAGE_KEYS.products, DEFAULT_PRODUCTS);
}

function getProductById(id) {
  return getProducts().find(p => p.id === id);
}

function saveProducts(products) {
  saveToStorage(STORAGE_KEYS.products, products);
}

function updateProduct(id, updates) {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...updates };
    saveProducts(products);
    return products[idx];
  }
  return null;
}

function addProduct(product) {
  const products = getProducts();
  const newP = {
    ...product,
    id: 'p' + Date.now(),
    stock: Number(product.stock) || 0,
    price: Number(product.price) || 0
  };
  products.push(newP);
  saveProducts(products);
  return newP;
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
}

// ===== Wishlist =====
function getWishlist() {
  const session = getSession();
  if (!session) return [];
  const all = getFromStorage(STORAGE_KEYS.wishlist, {});
  return all[session.id] || [];
}

function toggleWishlist(productId) {
  const session = getSession();
  if (!session) {
    showToast('Please login to use wishlist', 'error');
    return false;
  }
  const all = getFromStorage(STORAGE_KEYS.wishlist, {});
  let list = all[session.id] || [];
  const exists = list.includes(productId);
  if (exists) {
    list = list.filter(id => id !== productId);
    showToast('Removed from wishlist');
  } else {
    list.push(productId);
    showToast('Added to wishlist', 'success');
  }
  all[session.id] = list;
  saveToStorage(STORAGE_KEYS.wishlist, all);
  updateWishlistBadge();
  return !exists;
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    const count = getWishlist().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== Bookings (Pre-booking) =====
function getBookings() {
  return getFromStorage(STORAGE_KEYS.bookings, []);
}

function createBooking(booking) {
  const bookings = getBookings();
  const newB = {
    ...booking,
    id: 'b' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  bookings.unshift(newB);
  saveToStorage(STORAGE_KEYS.bookings, bookings);
  return newB;
}

function updateBookingStatus(id, status) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    saveToStorage(STORAGE_KEYS.bookings, bookings);
    return bookings[idx];
  }
  return null;
}

// ===== UI Helpers =====
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN');
}

function getStockClass(stock) {
  if (stock <= 0) return 'stock-out';
  if (stock <= 10) return 'stock-low';
  return 'stock-in';
}

function getStockText(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 10) return `Only ${stock} left`;
  return 'In Stock';
}

// ===== Render Products =====
function renderProductCard(product) {
  const inWish = isInWishlist(product.id);
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x500/E8D5B7/8B5A2B?text=Uniqueman'">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="wishlist-btn ${inWish ? 'active' : ''}" onclick="handleWishlist('${product.id}', this)" title="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">
          ${formatPrice(product.price)}
          ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-stock ${getStockClass(product.stock)}">${getStockText(product.stock)}</div>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm" style="flex:1" onclick="openPrebookModal('${product.id}')">
            Pre-Book
          </button>
          <button class="btn btn-outline btn-sm" onclick="openProductDetail('${product.id}')">View</button>
        </div>
      </div>
    </div>
  `;
}

function handleWishlist(productId, btn) {
  const added = toggleWishlist(productId);
  if (btn) {
    btn.classList.toggle('active', added);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
  }
}

// ===== Pre-book Modal =====
function openPrebookModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  if (!isLoggedIn()) {
    showToast('Please login to pre-book items', 'error');
    setTimeout(() => window.location.href = 'login.html', 1200);
    return;
  }

  let overlay = document.getElementById('prebook-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'prebook-modal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  const sizesHtml = product.sizes.map(s => 
    `<button type="button" class="size-btn" data-size="${s}" onclick="selectSize(this)">${s}</button>`
  ).join('');

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>Pre-Book: ${product.name}</h3>
        <button class="modal-close" onclick="closeModal('prebook-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="flex gap-2 mb-2" style="gap:1rem">
          <img src="${product.image}" alt="" style="width:80px;height:100px;object-fit:cover;border-radius:8px" onerror="this.src='https://via.placeholder.com/80x100'">
          <div>
            <strong>${product.name}</strong>
            <div class="product-price mt-1">${formatPrice(product.price)}</div>
            <div class="product-stock ${getStockClass(product.stock)}">${getStockText(product.stock)}</div>
          </div>
        </div>
        <form id="prebook-form">
          <input type="hidden" name="productId" value="${product.id}">
          <div class="form-group">
            <label>Select Size *</label>
            <div class="size-options" id="size-options">${sizesHtml}</div>
            <input type="hidden" name="size" id="selected-size" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Quantity *</label>
              <input type="number" name="quantity" class="form-control" min="1" max="5" value="1" required>
            </div>
            <div class="form-group">
              <label>Preferred Date</label>
              <input type="date" name="preferredDate" class="form-control" min="${new Date().toISOString().split('T')[0]}">
            </div>
          </div>
          <div class="form-group">
            <label>Your Phone *</label>
            <input type="tel" name="phone" class="form-control" placeholder="9876543210" required pattern="[0-9]{10}">
          </div>
          <div class="form-group">
            <label>Notes (optional)</label>
            <textarea name="notes" class="form-control" rows="2" placeholder="Any special request..."></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal('prebook-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="submitPrebook()">Confirm Pre-Booking</button>
      </div>
    </div>
  `;
  overlay.classList.add('active');
}

function selectSize(btn) {
  document.querySelectorAll('#size-options .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('selected-size').value = btn.dataset.size;
}

function submitPrebook() {
  const form = document.getElementById('prebook-form');
  const size = document.getElementById('selected-size').value;
  if (!size) {
    showToast('Please select a size', 'error');
    return;
  }
  const session = getSession();
  const product = getProductById(form.productId.value);
  const booking = {
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    price: product.price,
    size,
    quantity: Number(form.quantity.value),
    preferredDate: form.preferredDate.value || null,
    phone: form.phone.value,
    notes: form.notes.value,
    userId: session.id,
    userName: session.name,
    userEmail: session.email
  };
  createBooking(booking);
  closeModal('prebook-modal');
  showToast('Pre-booking confirmed! We will contact you soon.', 'success');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

function openProductDetail(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let overlay = document.getElementById('detail-modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'detail-modal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="modal" style="max-width:640px">
      <div class="modal-header">
        <h3>${product.name}</h3>
        <button class="modal-close" onclick="closeModal('detail-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
          <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:12px;aspect-ratio:3/4;object-fit:cover" onerror="this.src='https://via.placeholder.com/300x400'">
          <div>
            <div class="product-category">${product.category}</div>
            <div class="product-price" style="font-size:1.4rem;margin:0.5rem 0">
              ${formatPrice(product.price)}
              ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <div class="product-stock ${getStockClass(product.stock)} mb-2">${getStockText(product.stock)}</div>
            <p style="color:var(--coffee-700);margin-bottom:1rem;font-size:0.95rem">${product.description}</p>
            <p style="font-size:0.85rem;color:var(--coffee-600)"><strong>Available sizes:</strong> ${product.sizes.join(', ')}</p>
            <div class="mt-2" style="display:flex;gap:0.5rem;flex-wrap:wrap">
              <button class="btn btn-primary" onclick="closeModal('detail-modal');openPrebookModal('${product.id}')">Pre-Book Now</button>
              <button class="btn btn-outline" onclick="handleWishlist('${product.id}');closeModal('detail-modal')">
                ${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  overlay.classList.add('active');
}

// ===== Header Render =====
function renderHeader(activePage = '') {
  const session = getSession();
  const wishCount = getWishlist().length;

  return `
    <header class="header">
      <div class="nav-container">
        <a href="index.html" class="logo">
          <div class="logo-icon">U</div>
          <span>Uniqueman</span>
        </a>
        <button class="mobile-toggle" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
        <ul class="nav-links">
          <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="products.html" class="${activePage === 'products' ? 'active' : ''}">Shop</a></li>
          <li><a href="wishlist.html" class="${activePage === 'wishlist' ? 'active' : ''}">Wishlist</a></li>
          <li><a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a></li>
          ${isAdmin() ? `<li><a href="admin.html" class="${activePage === 'admin' ? 'active' : ''}">Admin</a></li>` : ''}
        </ul>
        <div class="nav-actions">
          <a href="wishlist.html" class="icon-btn" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span class="badge" id="wishlist-badge" style="display:${wishCount > 0 ? 'flex' : 'none'}">${wishCount}</span>
          </a>
          ${session ? `
            <span style="font-size:0.9rem;color:var(--coffee-700)">Hi, ${session.name.split(' ')[0]}</span>
            <button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button>
          ` : `
            <a href="login.html" class="btn btn-primary btn-sm">Login</a>
          `}
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <h4>Uniqueman Men's Wear</h4>
          <p>#EXCLUSIVE Men's Clothing Outlet</p>
          <p>B-210, 1st Floor, Jhilmil<br>Near Garam Masala, Delhi 110095</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="index.html">Home</a>
          <a href="products.html">Shop All</a>
          <a href="wishlist.html">Wishlist</a>
          <a href="contact.html">Contact Us</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>📞 +91 87962 46647</p>
          <a href="https://wa.me/918796246647" target="_blank">WhatsApp Us</a>
          <a href="https://www.instagram.com/_uniqueman__/" target="_blank">Instagram @_uniqueman__</a>
        </div>
        <div>
          <h4>Hours</h4>
          <p>Mon – Sat: 11:00 AM – 9:00 PM</p>
          <p>Sunday: 12:00 PM – 8:00 PM</p>
        </div>
      </div>
      <div class="footer-bottom">
        © ${new Date().getFullYear()} Uniqueman Men's Wear. All rights reserved. | Built with ☕
      </div>
    </footer>
  `;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  initData();
  updateWishlistBadge();
});
