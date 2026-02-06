fetch("https://coreth-backend.onrender.com/api/products")
  .then(res => res.json())
  .then(products => {
    const grid = document.querySelector(".products-grid");

    grid.innerHTML = "";

    products.forEach(product => {
      grid.innerHTML += `
        <div class="product-card">
          <div class="product-image-wrapper">
            <div class="product-image"
              style="background-image:url('${product.image}')">
              <div class="product-overlay">
                <button class="quick-view-btn"
                  onclick="openProduct('${product._id}')">
                  Quick View
                </button>
              </div>
            </div>
          </div>

          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button class="add-to-cart-btn">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      `;
    });
  });

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

