async function loadProducts() {
  try {
    const response = await fetch('https://coreth-backend.onrender.com/api/products');
    const products = await response.json();

    console.log('Loaded products:', products);

    const grid = document.querySelector('.products-grid');

    if (!grid) {
      console.error('Products grid not found!');
      return;
    }

    grid.innerHTML = '';

    products.forEach(product => {
      // 🔥 Use imagePosition class directly from MongoDB
      const positionClass = product.imagePosition || 'img-center';

      const productCard = `
        <div class="product-card" data-product="${product._id}">
          <div class="product-image-wrapper">
            <div class="product-image ${positionClass}" style="background-image: url('${product.image}');">
              <div class="product-overlay">
                <button class="quick-view-btn" onclick="openProduct('${product._id}')">Quick View</button>
              </div>
            </div>
            ${product.stock < 10 ? '<div class="product-badge">Low Stock</div>' : '<div class="product-badge">New</div>'}
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            
              
          </div>
        </div>
      `;

      grid.innerHTML += productCard;
    });

    // Re-apply intersection observer
    document.querySelectorAll('.product-card').forEach(card => {
      observer.observe(card);
    });

    // Re-apply add to cart listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.add('added');
        const span = btn.querySelector('span');
        const text = span.textContent;
        span.textContent = 'Added!';

        setTimeout(() => {
          btn.classList.remove('added');
          span.textContent = text;
        }, 2000);
      });
    });

  } catch (error) {
    console.error('Error loading products:', error);
    alert('Failed to load products. Make sure backend is running!');
  }
}

function addToCart(productId) {
  console.log('Adding to cart:', productId);
}

window.addEventListener('load', loadProducts);