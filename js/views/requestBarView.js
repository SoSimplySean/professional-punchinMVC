const requestBar = document.querySelector(".request-bar");
const footer = document.querySelector(".footer-container");
const requestButton = document.querySelector(".request-button");
const modalOverlay = document.querySelector(".modal-overlay");
const requestModal = document.querySelector(".request-modal-container");
const projectPageContainer = document.querySelector(`.project-page-container`);

// REQUEST BAR

reqObsOpt = {
  root: null,
  threshold: 0.99,
};

fixRequestBar = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    requestBar.classList.add("display-none");
  } else {
    requestBar.classList.remove("display-none");
  }
};

requestObserver = new IntersectionObserver(fixRequestBar, reqObsOpt);

requestObserver.observe(footer);

// REQUEST FORM

// Request form - general function to unhide
const showRequestForm = function () {
  modalOverlay.classList.remove("hidden");
  requestModal.classList.remove("hidden");
};

// Request form - general function to hide
const hideRequestForm = function () {
  modalOverlay.classList.add("hidden");
  requestModal.classList.add("hidden");
  projectPageContainer.innerHTML = "";
};

// Request form - button activation to unhide
requestBar.addEventListener(`click`, showRequestForm);

// Request form - button activation to hide
modalOverlay.addEventListener(`click`, hideRequestForm);
document.addEventListener(`keydown`, function (e) {
  if (e.key === "Escape" && !requestModal.classList.contains("hidden"))
    hideRequestForm();
});
