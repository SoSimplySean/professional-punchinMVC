// Request Bar - remove at bottom

const reqObsOpt = {
  root: null,
  threshold: 1,
};

const fixRequestBar = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    requestBar.classList.add("display-none");
  } else {
    requestBar.classList.remove("display-none");
  }
};

const requestObserver = new IntersectionObserver(fixRequestBar, reqObsOpt);

requestObserver.observe(footer);

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
