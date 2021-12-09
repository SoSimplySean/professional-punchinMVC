class RequestBarView {
  constructor() {
    this.requestBar = document.querySelector(".request-bar");
    this.footer = document.querySelector(".footer-container");

    this.reqObsOpt = {
      root: null,
      threshold: 0.99,
    };
  }

  addIntersectionObserver(handler) {
    const requestObserver = new IntersectionObserver(handler, this.reqObsOpt);
    requestObserver.observe(this.footer);
  }

  fixRequestBar(entries) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      this.requestBar.classList.add("display-none");
    } else {
      this.requestBar.classList.remove("display-none");
    }
  }
}

export default new RequestBarView();
