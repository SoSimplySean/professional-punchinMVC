class SearchBarView {
  constructor() {
    this.header = document.querySelector("header");
    this.searchContainer = document.querySelector(`.search-bar`);
    this.searchInput = document.querySelector(`.search-bar__input`);
    this.bannerContainer = document.querySelector(`.hero-banner-container`);
    this.searchObsOpt = {
      root: null,
      threshold: 0,
    };
  }

  addIntersectionObserver(handler) {
    const searchObserver = new IntersectionObserver(handler, this.searchObsOpt);

    searchObserver.observe(this.header);
  }

  // To be triggered upon intersection observer
  fixSearchContainer(entries) {
    const [entry] = entries;
    // Since "fixed" results in overlap, we have to adjust the margin for the banner as well
    if (!entry.isIntersecting) {
      this.searchContainer.classList.add("search-fixed");
      this.bannerContainer.style.marginTop = `6rem`;
    } else {
      this.searchContainer.classList.remove("search-fixed");
      this.bannerContainer.style.marginTop = `0`;
    }
  }

  addHandlerSearch(handler) {
    this.searchInput.addEventListener(`keyup`, (e) => {
      // Scroll up every time you type a key
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      handler();
    });
  }

  getQuery() {
    // Make case insensitive
    return this.searchInput.value.toLowerCase();
  }
}

export default new SearchBarView();
