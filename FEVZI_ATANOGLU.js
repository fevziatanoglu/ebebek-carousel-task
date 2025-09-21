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
            <div class="carousel-wrapper">
              <button class="carousel-button left"><span class="toys-icon toys-icon-arrow-left"></span></button>
              <button class="carousel-button right"><span class="toys-icon toys-icon-arrow-right"></span></button>
            </div>
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

    const itemsHTML = items.map(item => `
        <div class="carousel-item" data-id="${item.id}">
          <a href="${item.url}" target="_blank" class="item-link">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
              <div class="item-info">
              <div class="brand">${item.brand}</div>
              <h3 class="item-name">${item.name}</h3>
              <div class="price-container">
                <span class="current-price">${item.price} TL</span>
                ${item.original_price !== item.price ?
        `<span class="original-price">Sepette ${item.original_price} TL</span>` : ''
      }
              </div>
            </div>
          </a>
        </div>
      `).join('');

    itemsContainer.innerHTML += itemsHTML;
  };

  const buildCSS = () => {

  }

  const setEvents = () => {

  }

  init();


})();
