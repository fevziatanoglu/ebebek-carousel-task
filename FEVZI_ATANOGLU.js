(() => {

  const init = () => {

    if (location.hostname !== "www.e-bebek.com" || location.pathname !== "/") {
      console.log("wrong page");
      return;
    }

    buildHTML();
    fetchItems();
    buildCSS();
    setEvents();
  }

  const buildHTML = () => {
    const section2A = document.querySelector('.Section2A');
    if (!section2A) {
      console.log("Section2A not found");
      return;
    }

    const carouselHTML = `
                <div class="carousel">
                  <div class="container">
                    <h2 class="carousel-title">Sizin için Seçtiklerimiz</h2>
                    <button class="carousel-button left"><span class="toys-icon toys-icon-arrow-left"></span></button>
                    <div class="carousel-wrapper"></div>
                    <button class="carousel-button right"><span class="toys-icon toys-icon-arrow-right"></span></button>
                  </div>
                </div>
              `;

    section2A.insertAdjacentHTML('beforebegin', carouselHTML);
  };

  const fetchItems = async () => {
    let items
    if (!localStorage.getItem('carouselItems')) {
      try {
        const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
        items = await response.json();
        localStorage.setItem('carouselItems', JSON.stringify(items));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    } else {
      items = JSON.parse(localStorage.getItem('carouselItems'));
    }
    renderItems(items);
  }

  const renderItems = (items) => {
    const itemsContainer = document.querySelector('.carousel-wrapper');
    if (!itemsContainer) return;

    const formatPrice = (price) => {
      const [whole, decimal] = price.toString().split('.');
      if (decimal) {
        return `${whole}<span class="decimal">,${decimal}</span>`;
      }
      return whole;
    };

    const itemsHTML = items.map(item => `
    <div class="carousel-item" data-id="${item.id}">
       <button class="favorite-button" data-id="${item.id}" aria-label="Add to favorites">
         <span class="toys-icon toys-icon-heart-outline"></span>
      </button>
      <a href="${item.url}" target="_blank" class="carousel-item-link">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="brand item-name">${item.brand} - ${item.name}</div>

        <div class="star-rating">
          <span class="star cx-icon fas fa-star"></span>
          <span class="star cx-icon fas fa-star"></span>
          <span class="star cx-icon fas fa-star"></span>
          <span class="star cx-icon fas fa-star"></span>
          <span class="star cx-icon fas fa-star"></span>
          <span class="rate-count"> (${Math.floor(Math.random() * 150 + 50)})</span>
        </div>

        <div class="price-container">
          ${item.original_price === item.price ?
        `<span class="current-price">${formatPrice(item.price)} TL</span>` : `
            <div class="price-row">
              <span class="old_price">${formatPrice(item.original_price)} TL</span>
              <span class="discount-badge">%${Math.round(((item.original_price - item.price) / item.original_price) * 100)}</span>
            </div>
            <span class="new-price">${formatPrice(item.price)} TL</span>`}
        </div>
      </a>
    </div>
  `).join('');

    itemsContainer.innerHTML += itemsHTML;
  };

  const buildCSS = () => {
    const styles = `
            <style>
              .carousel {
                padding: 25px 0;
              }

              .carousel .container {
                width: 100%;
                position: relative;
                overflow-x: visible;
              }

              .carousel-wrapper {
                padding: 20px 0;
                -ms-overflow-style: none;
                scrollbar-width: none;          
                -webkit-scrollbar: none;
                -ms-overflow-style: none;       
              }

              .carousel-title {
                font-size: 24px;
                font-weight: 700;
                text-align: start;
                margin: 0;
              }

              .carousel-wrapper {
                position: relative;
                display: flex;
                gap: 15px;
                overflow-x: auto;
              }

              .carousel-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 50%;
                background: #fff;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }

              .toys-icon {
                height: 14px;
                width: 14px;
              }

              .carousel-button.left {
                left: -50px;
              }

              .carousel-button.right {
                right: -50px;
              }

            .carousel-item {
                min-width: 250px;
                position: relative;
              }

              .carousel-item-link {
                height: 100%;         
                display: flex;
                flex-direction: column;
                justify-content: space-between; 
                align-items: center;
                border: 1px solid #e0e0e09d;
                border-radius: 8px;
                overflow: hidden;  
                text-decoration: none;
                color: inherit;
                padding: 0 10px 10px 10px;
              }

              .star-rating {
                width: 100%;
                display: flex;
                justify-content: start;
                gap: 1px;
              }

              .rate-count {
                opacity: 0.4;
              }

              .star-rating .star {
                color: #ff8a00 !important; 
              }

              .favorite-button {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 50;
                background: none;
                cursor: pointer;
                font-size: 18px;
              }

              .favorite-button:hover {
                opacity: 0.6;
              }

              .carousel-item-link:hover {
                text-decoration: none;
                color: inherit;
                border-color: #ccc;
              }

              .carousel-item img {
                max-height: 60%;
                width: 200px;
                object-fit: cover;
                display: block;
              }

              .item-name {
                font-size: 12px;
                font-weight: 500;
              }

              .price-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                text-align: start;
              }

              .current-price {
                font-size: 20px;
                margin-right: 8px;
              }

              .original-price {
                font-size: 12px;
                color: #666;
              }

              .discount-badge {
                background-color: #00a365;
                color: white;
                font-size: 12px;
                padding: 2px 6px;
                border-radius: 10px;
                margin-left: 8px;
              }

              .old_price {
                font-size: 12px;
                opacity: 0.6;
              }

              .new-price {
                font-size: 20px;
                margin-right: 8px;
                color: #00a365;
              }

              .decimal {
                font-size: 0.7em;
              }

              @media (max-width: 1024px) {

                .carousel-item {
                  width: 300px;
                }  

                .carousel-button {
                  display: none;
                }

              }

              @media (max-width: 768px) {
                .carousel .container {
                  padding: 0 15px;
                }
                
                .carousel-item {
                  width: 180px;
                }
                
                .carousel-title {
                  font-size: 20px;
                }

                .carousel-item {
                  width: 350px;
                }  
              }

              @media (max-width: 480px) {
                .carousel-item {
                  width: 180px;
                }
                
                .carousel-button {
                  width: 35px;
                  height: 35px;
                }
              }
            </style>
          `;

    document.head.insertAdjacentHTML('beforeend', styles);
  };

  const setEvents = () => {

  }

  init();


})();
