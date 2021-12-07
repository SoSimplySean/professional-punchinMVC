import * as model from "./model";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import * as searchBarView from "./views/searchBarView";
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

const controlSearchResults = async function () {
  // 1) Get search query
  const query = searchView.getQuery();

  // 2) Load search results into state.search.results
  await model.loadSearchResults(query);

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

const init = async function () {
  // 1) Create original dataset from CSV
  await model.createMatrix();

  //   2) Reset the system
  reset();

  paginationView.addHandlerClick(controlPagination);
};
init();

// Add favourite feature for the account
// Set up search functionality
// Add individual project page popup
// Add event handlers for everything
