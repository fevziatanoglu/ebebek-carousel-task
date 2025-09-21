(() => {

  const init = () => {

    if (location.hostname !== "www.e-bebek.com" || location.pathname !== "/") {
      console.log("wrong page");
      return;
    }

    buildHTML();
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
          <h2 class="carousel-title">Sizin için Seçtiklerimiz/h2>
          <div class="carousel-wrapper">
            <button class="carousel-button left"><span class="toys-icon toys-icon-arrow-left"></span></button>
            <button class="carousel-button right"><span class="toys-icon toys-icon-arrow-right"></span></button>
          </div>
        </div>
      </div>
    `;

    section2A.insertAdjacentHTML('beforebegin', carouselHTML);
  };


  const buildCSS = () => {

  }

  const setEvents = () => {

  }

  init();


})();
