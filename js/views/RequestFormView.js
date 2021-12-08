class RequestFormView {
  constructor() {
    this.requestBar = document.querySelector(".request-bar");
    this.footer = document.querySelector(".footer-container");
    this.requestButton = document.querySelector(".request-button");
    this.modalOverlay = document.querySelector(".modal-overlay");
    this.requestModal = document.querySelector(".request-modal-container");
    this.projectPageContainer = document.querySelector(`.project-pages`);
  }

  // Request form - button activation to unhide
  addHandlerClickBar(handler) {
    this.requestBar.addEventListener(`click`, handler);
  }

  addHandlerClickOverlay(handler) {
    this.modalOverlay.addEventListener(`click`, handler);
  }

  addHandlerEscape(handler) {
    document.addEventListener(`keydown`, function (e) {
      if (e.key === "Escape" && !this.requestModal.classList.contains("hidden"))
        handler();
    });
  }

  // Request form - general function to unhide
  showRequestForm() {
    this.modalOverlay.classList.remove("hidden");
    this.requestModal.classList.remove("hidden");
  }

  // Request form - general function to hide
  hideRequestForm() {
    this.modalOverlay.classList.add("hidden");
    this.requestModal.classList.add("hidden");
    this.projectPageContainer.innerHTML = "";
  }
}

export default new RequestFormView();
