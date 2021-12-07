const header = document.querySelector("header");
const searchContainer = document.querySelector(`.search-bar`);
const bannerContainer = document.querySelector(`.hero-banner-container`);

searchObsOpt = {
  root: null,
  threshold: 0,
};

fixSearchContainer = function (entries) {
  const [entry] = entries;

  // Since "fixed" results in overlap, we have to adjust the margin for the banner as well
  if (!entry.isIntersecting) {
    searchContainer.classList.add("search-fixed");
    bannerContainer.style.marginTop = `6rem`;
  } else {
    searchContainer.classList.remove("search-fixed");
    bannerContainer.style.marginTop = `0`;
  }
};

searchObserver = new IntersectionObserver(fixSearchContainer, searchObsOpt);

searchObserver.observe(header);
