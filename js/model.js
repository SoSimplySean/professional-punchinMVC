import { CSV, RES_PER_PAGE } from "./config.js";
require("babel-polyfill");

export const state = {
  project: {},
  allProjects: [],
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    totalPages: 1,
  },
};

export const createMatrix = async function () {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/1VWRfBiRJTia4_xznSFc-sE_LrtgIZ3JeeFVsjqWw96Q/gviz/tq?tqx=out:csv`
    );
    const data = await response.text();

    // 1) Split data into rows and get rid of the header row
    let rows = await data.split("\n").slice(1);

    // 2) Convert row of commas into an array. Matrix formed (multiple rows of arrays. Each row is one project)
    const intermediate = await rows.map((row) => row.split(`,`));

    // 3) Remove quotation marks from each item
    const mtx = await intermediate.map((project) =>
      project.map((text) => text.slice(1, -1))
    );

    state.allProjects = mtx;
    state.search.results = mtx;

    state.search.totalPages = Math.ceil(
      mtx.length / state.search.resultsPerPage
    );
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = function (query) {
  state.search.query = query;

  state.search.results = state.allProjects.filter((project) =>
    project[1].toLowerCase().includes(query)
  );

  // if (query === "") {
  //   controller.reset(); // Run intial set up
  // } else {
  //   state.search.results = state.search.results.filter((project) =>
  //     project[1].toLowerCase().includes(query)
  //   );
  //   mainApp.runMatrix(mtx, 1); // Run filtered set up
  // }

  state.search.totalPages = Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  );

  state.search.page = 1;
};

export const loadFavouritedProjects = function () {
  state.search.results = state.allProjects.filter(favourited);

  state.search.totalPages = Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  );
  state.search.page = 1;
};

export const getSearchResultsPage = function (
  page = state.search.page,
  data = state.search.results
) {
  state.search.page = page;

  state.search.totalPages = Math.ceil(
    state.search.results.length / state.search.resultsPerPage
  );

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return data.slice(start, end);
};

function favourited(project) {
  for (let i = 0; i < localStorage.length; i++) {
    if (project[0] == localStorage.key(i)) {
      return true;
    }
  }
  return false;
}
