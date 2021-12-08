import * as model from "./model";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
import SearchBarView from "./views/SearchBarView";
import RequestBarView from "./views/RequestBarView";
import RequestFormView from "./views/RequestFormView";
import ProjectPageView from "./views/ProjectPageView";

const reset = function () {
  // 1) Get the projects to load for page 1
  const setOfProjects = model.getSearchResultsPage(1, model.state.allProjects);

  // 2) Create cards based on the set of projects
  ResultsView.render(setOfProjects);

  // 3) Render initial pagination buttons
  PaginationView.render(model.state.search.totalPages, model.state.search.page);

  //   4) Add project page event listener
  ProjectPageView.addProjectPage(model.state.allProjects);
};

const controlSearchResults = function () {
  // 1) Get search query
  const query = SearchBarView.getQuery();

  // 2) Load search results into state.search.results
  model.loadSearchResults(query);

  // 3) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage();

  // 4) Create cards based on the set of projects
  ResultsView.render(setOfProjects);

  // 5) Render initial pagination buttons
  PaginationView.render(model.state.search.totalPages, model.state.search.page);
};

const controlPagination = function (goToPage) {
  // 1) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage(goToPage);

  // 2) Create cards based on the set of projects
  ResultsView.render(setOfProjects);

  //   3) Render pagination buttons
  PaginationView.render(model.state.search.totalPages, model.state.search.page);
};

const controlFavourited = function () {
  // 1) Load favourited projects
  model.loadFavouritedProjects();
  // 2) Load sliced search results of certain page
  const setOfProjects = model.getSearchResultsPage();
  // 3) Create cards based on the set of projects
  ResultsView.render(setOfProjects);
  // 4) Render initial pagination buttons
  PaginationView.render(model.state.search.totalPages, model.state.search.page);
};

const controlSearchBar = function (entries) {
  SearchBarView.fixSearchContainer(entries);
};

const controlRequestBar = function (entries) {
  RequestBarView.fixRequestBar(entries);
};

const controlShowModal = function () {
  RequestFormView.showRequestForm();
};

const controlHideModal = function () {
  RequestFormView.hideRequestForm();
};

const init = async function () {
  // 1) Create original dataset from CSV
  await model.createMatrix();
  //   2) Reset the system
  reset();

  PaginationView.addHandlerClick(controlPagination);
  ResultsView.addHandlerFavourited(controlFavourited, reset);
  SearchBarView.addIntersectionObserver(controlSearchBar);
  SearchBarView.addHandlerSearch(controlSearchResults);
  RequestBarView.addIntersectionObserver(controlRequestBar);
  RequestFormView.addHandlerClickBar(controlShowModal);
  RequestFormView.addHandlerClickOverlay(controlHideModal);
  RequestFormView.addHandlerEscape(controlHideModal);
};
init();

// Add JS for interest checker. Same layout. Just link to different things.
// Fix CSS for individual project page popup
// Fix the favourite issue
// Add "No favourited projects" if there are no projects
// Hook up to Netlify
