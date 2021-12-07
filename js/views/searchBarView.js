const header = document.querySelector("header");
const searchContainer = document.querySelector(`.search-bar`);
const searchInput = document.querySelector(`.search-bar__input`);
const bannerContainer = document.querySelector(`.hero-banner-container`);

class searchBarView {
  addHandlerSearch(handler) {
    searchInput.addEventListener(`keyup`, (e) => {
      // Scroll up every time you type a key
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      handler();
    });
  }

  getQuery() {
    // Make case insensitive
    return searchInput.value.toLowerCase();
  }
}

export default new searchBarView();
