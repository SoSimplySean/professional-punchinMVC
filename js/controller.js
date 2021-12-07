import * as model from "./model";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import searchBarView from "./views/searchBarView";
import * as requestBarView from "./views/requestBarView";

const reset = function () {
  // 1) Get the projects to load for page 1
  const setOfProjects = model.getSearchResultsPage(1, model.state.allProjects);

  // 2) Create cards based on the set of projects
  resultsView.render(setOfProjects);

  // 3) Render initial pagination buttons
  paginationView.render(model.state.search.totalPages, model.state.search.page);
};

reset();

const controlSearchResults = function () {
  // 1) Get search query
  const query = searchBarView.getQuery();

  // 2) Load search results into state.search.results
  model.loadSearchResults(query);

  // 3) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage();

  // 4) Create cards based on the set of projects
  resultsView.render(setOfProjects);

  // 5) Render initial pagination buttons
  paginationView.render(model.state.search.totalPages, model.state.search.page);
};

const controlPagination = function (goToPage) {
  // 1) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage(goToPage);

  // 2) Create cards based on the set of projects
  resultsView.render(setOfProjects);

  //   3) Render pagination buttons
  paginationView.render(model.state.search.totalPages, model.state.search.page);
};

const controlFavourited = function () {
  // 1) Load favourited projects
  model.loadFavouritedProjects();
  // 2) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage();
  // 3) Create cards based on the set of projects
  resultsView.render(setOfProjects);
  // 4) Render initial pagination buttons
  paginationView.render(model.state.search.totalPages, model.state.search.page);
};

const init = async function () {
  // 1) Create original dataset from CSV
  await model.createMatrix();

  //   2) Reset the system
  reset();

  paginationView.addHandlerClick(controlPagination);
  resultsView.addHandlerFavourited(controlFavourited, reset);
  searchBarView.addHandlerSearch(controlSearchResults);
};
init();

// Add individual project page popup
// Add event handlers for everything

// ===== FIND SOME WAY TO FIT SEARCH BAR INTO VIEW ==========

const header = document.querySelector("header");
const searchContainer = document.querySelector(`.search-bar`);
const searchInput = document.querySelector(`.search-bar__input`);
const bannerContainer = document.querySelector(`.hero-banner-container`);

const searchObsOpt = {
  root: null,
  threshold: 0,
};

const fixSearchContainer = function (entries) {
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

const searchObserver = new IntersectionObserver(
  fixSearchContainer,
  searchObsOpt
);

searchObserver.observe(header);
