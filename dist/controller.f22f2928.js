// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RES_PER_PAGE = void 0;
// export const CSV = "../data/test.csv";
var RES_PER_PAGE = 8;
exports.RES_PER_PAGE = RES_PER_PAGE;
},{}],"js/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.loadSearchResults = exports.loadFavouritedProjects = exports.getSearchResultsPage = exports.createMatrix = void 0;

var _config = require("./config.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// require("babel-polyfill");
var state = {
  project: {},
  allProjects: [],
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: _config.RES_PER_PAGE,
    totalPages: 1
  }
};
exports.state = state;

var createMatrix = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response, data, rows, intermediate, mtx;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("https://docs.google.com/spreadsheets/d/1VWRfBiRJTia4_xznSFc-sE_LrtgIZ3JeeFVsjqWw96Q/gviz/tq?tqx=out:csv");

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.text();

          case 6:
            data = _context.sent;
            _context.next = 9;
            return data.split("\n").slice(1);

          case 9:
            rows = _context.sent;
            _context.next = 12;
            return rows.map(function (row) {
              return row.split(",");
            });

          case 12:
            intermediate = _context.sent;
            _context.next = 15;
            return intermediate.map(function (project) {
              return project.map(function (text) {
                return text.slice(1, -1);
              });
            });

          case 15:
            mtx = _context.sent;
            state.allProjects = mtx;
            state.search.results = mtx;
            state.search.totalPages = Math.ceil(mtx.length / state.search.resultsPerPage);
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function createMatrix() {
    return _ref.apply(this, arguments);
  };
}();

exports.createMatrix = createMatrix;

var loadSearchResults = function loadSearchResults(query) {
  state.search.query = query;
  state.search.results = state.allProjects.filter(function (project) {
    return project[1].toLowerCase().includes(query);
  }); // if (query === "") {
  //   controller.reset(); // Run intial set up
  // } else {
  //   state.search.results = state.search.results.filter((project) =>
  //     project[1].toLowerCase().includes(query)
  //   );
  //   mainApp.runMatrix(mtx, 1); // Run filtered set up
  // }

  state.search.totalPages = Math.ceil(state.search.results.length / state.search.resultsPerPage);
  state.search.page = 1;
};

exports.loadSearchResults = loadSearchResults;

var loadFavouritedProjects = function loadFavouritedProjects() {
  state.search.results = state.allProjects.filter(favourited);
  state.search.totalPages = Math.ceil(state.search.results.length / state.search.resultsPerPage);
  state.search.page = 1;
};

exports.loadFavouritedProjects = loadFavouritedProjects;

var getSearchResultsPage = function getSearchResultsPage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.search.page;
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : state.search.results;
  state.search.page = page;
  state.search.totalPages = Math.ceil(state.search.results.length / state.search.resultsPerPage);
  var start = (page - 1) * state.search.resultsPerPage;
  var end = page * state.search.resultsPerPage;
  return data.slice(start, end);
};

exports.getSearchResultsPage = getSearchResultsPage;

function favourited(project) {
  for (var i = 0; i < localStorage.length; i++) {
    if (project[0] == localStorage.key(i)) {
      return true;
    }
  }

  return false;
}
},{"./config.js":"js/config.js"}],"js/views/ResultsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResultsView = /*#__PURE__*/function () {
  function ResultsView() {
    _classCallCheck(this, ResultsView);

    this.projectList = document.querySelector(".projects");
    this.header__user = document.querySelector(".header__user");
  }

  _createClass(ResultsView, [{
    key: "addHandlerFavourited",
    value: function addHandlerFavourited(handler, reset) {
      this.header__user.addEventListener("click", function () {
        this.classList.toggle("activeUser");

        if (this.classList.contains("activeUser")) {
          handler();
        } else {
          reset();
        }
      });
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this = this;

      this.projectList.innerHTML = ""; // For each row (array), create a HTML card

      data.forEach(function (project) {
        var htmlString = "\n            <li class=\"project-card-container\">\n                <img\n                src=\"".concat(project[3], "\"\n                alt=\"\"\n                class=\"project-card__img\"\n                />\n                <div class=\"project-card__text-container\">\n                <div>\n                <p class=\"project-card__id\" style=\"display: none;\">").concat(project[0], "</p>\n                <h2 class=\"project-card__title\">").concat(project[1], "</h2>\n                <p class=\"project-card__eta\">Est. ").concat(project[2], "</p>\n                </div>\n                <i class=\"project-card__heart bi bi-suit-heart\"></i>\n                </div>\n            </li>");

        _this.projectList.insertAdjacentHTML("beforeend", htmlString);
      });
      var likeProject = document.querySelectorAll(".project-card__heart"); // FAVOURITE PROJECTS
      // Putting it here for now since it only works after items load

      likeProject.forEach(function (item) {
        // Activate heart if it is in local storage
        // Gets the ID of the project card
        var id = item.closest("div div").firstElementChild.firstElementChild.innerText;

        for (var i = 0; i < localStorage.length; i++) {
          if (id == localStorage.key(i)) {
            item.classList.remove("bi-suit-heart");
            item.classList.add("bi-suit-heart-fill");
            item.classList.add("heart");
          }
        }

        item.addEventListener("click", function () {
          item.classList.toggle("bi-suit-heart-fill");
          item.classList.toggle("bi-suit-heart");
          item.classList.toggle("heart"); // Checks whether the project was saved and adds/removes from local storage

          if (item.classList.contains("heart")) {
            localStorage.setItem(id, id);
          } else {
            localStorage.removeItem(id, id);
          }
        });
      });
    }
  }]);

  return ResultsView;
}();

var _default = new ResultsView();

exports.default = _default;
},{}],"js/views/PaginationView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PaginationView = /*#__PURE__*/function () {
  function PaginationView() {
    _classCallCheck(this, PaginationView);

    this.pagination__buttons = document.querySelector(".pagination__buttons");
  }

  _createClass(PaginationView, [{
    key: "addHandlerClick",
    value: function addHandlerClick(handler) {
      this.pagination__buttons.addEventListener("click", function (e) {
        var btn = e.target.closest(".pagination__button");
        if (!btn) return;
        var goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
    }
  }, {
    key: "render",
    value: function render(totalPages, currentPage) {
      var buttons = "";
      var activeButton;
      var beforePage = currentPage - 1;
      var afterPage = currentPage + 1; // Adds previous button

      if (currentPage > 1) {
        buttons += "<li class=\"pagination__button pagination__prev\" data-goto=\"".concat(currentPage - 1, "\"><i class=\"bi bi-chevron-left\"></i></li>");
      } // Adds three page numbers at all times


      for (var page = beforePage; page <= afterPage; page++) {
        if (page > totalPages) {
          continue;
        }

        if (page == 0) {
          page = page + 1;
        } // Makes center page active and highlighted


        if (page == currentPage) {
          activeButton = "active";
        } else {
          activeButton = "";
        }

        buttons += "<li class=\"pagination__button pagination__number ".concat(activeButton, "\" data-goto=\"").concat(page, "\"><span>").concat(page, "</span></li>");
      } // Adds next button


      if (currentPage < totalPages) {
        buttons += "<li class=\"pagination__button pagination__next\"  data-goto=\"".concat(currentPage + 1, "\"><i class=\"bi bi-chevron-right\"></i></li>");
      }

      this.pagination__buttons.innerHTML = buttons;
    }
  }]);

  return PaginationView;
}();

var _default = new PaginationView();

exports.default = _default;
},{}],"js/views/SearchBarView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SearchBarView = /*#__PURE__*/function () {
  function SearchBarView() {
    _classCallCheck(this, SearchBarView);

    this.header = document.querySelector("header");
    this.searchContainer = document.querySelector(".search-bar");
    this.searchInput = document.querySelector(".search-bar__input");
    this.bannerContainer = document.querySelector(".hero-banner-container");
    this.searchObsOpt = {
      root: null,
      threshold: 0
    };
  }

  _createClass(SearchBarView, [{
    key: "addIntersectionObserver",
    value: function addIntersectionObserver(handler) {
      var searchObserver = new IntersectionObserver(handler, this.searchObsOpt);
      searchObserver.observe(this.header);
    } // To be triggered upon intersection observer

  }, {
    key: "fixSearchContainer",
    value: function fixSearchContainer(entries) {
      var _entries = _slicedToArray(entries, 1),
          entry = _entries[0]; // Since "fixed" results in overlap, we have to adjust the margin for the banner as well


      if (!entry.isIntersecting) {
        this.searchContainer.classList.add("search-fixed");
        this.bannerContainer.style.marginTop = "6rem";
      } else {
        this.searchContainer.classList.remove("search-fixed");
        this.bannerContainer.style.marginTop = "0";
      }
    }
  }, {
    key: "addHandlerSearch",
    value: function addHandlerSearch(handler) {
      this.searchInput.addEventListener("keyup", function (e) {
        // Scroll up every time you type a key
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        handler();
      });
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      // Make case insensitive
      return this.searchInput.value.toLowerCase();
    }
  }]);

  return SearchBarView;
}();

var _default = new SearchBarView();

exports.default = _default;
},{}],"js/views/RequestBarView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RequestBarView = /*#__PURE__*/function () {
  function RequestBarView() {
    _classCallCheck(this, RequestBarView);

    this.requestBar = document.querySelector(".request-bar");
    this.footer = document.querySelector(".footer-container");
    this.reqObsOpt = {
      root: null,
      threshold: 0.99
    };
  }

  _createClass(RequestBarView, [{
    key: "addIntersectionObserver",
    value: function addIntersectionObserver(handler) {
      var requestObserver = new IntersectionObserver(handler, this.reqObsOpt);
      requestObserver.observe(this.footer);
    }
  }, {
    key: "fixRequestBar",
    value: function fixRequestBar(entries) {
      var _entries = _slicedToArray(entries, 1),
          entry = _entries[0];

      if (entry.isIntersecting) {
        this.requestBar.classList.add("display-none");
      } else {
        this.requestBar.classList.remove("display-none");
      }
    }
  }]);

  return RequestBarView;
}();

var _default = new RequestBarView();

exports.default = _default;
},{}],"js/views/RequestFormView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RequestFormView = /*#__PURE__*/function () {
  function RequestFormView() {
    _classCallCheck(this, RequestFormView);

    this.requestBar = document.querySelector(".request-bar");
    this.footer = document.querySelector(".footer-container");
    this.requestButton = document.querySelector(".request-button");
    this.modalOverlay = document.querySelector(".modal-overlay");
    this.requestModal = document.querySelector(".request-modal-container");
    this.projectPageContainer = document.querySelector(".project-pages");
  } // Request form - button activation to unhide


  _createClass(RequestFormView, [{
    key: "addHandlerClickBar",
    value: function addHandlerClickBar(handler) {
      this.requestBar.addEventListener("click", handler);
    }
  }, {
    key: "addHandlerClickOverlay",
    value: function addHandlerClickOverlay(handler) {
      this.modalOverlay.addEventListener("click", handler);
    }
  }, {
    key: "addHandlerEscape",
    value: function addHandlerEscape(handler) {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !this.requestModal.classList.contains("hidden")) handler();
      });
    } // Request form - general function to unhide

  }, {
    key: "showRequestForm",
    value: function showRequestForm() {
      this.modalOverlay.classList.remove("hidden");
      this.requestModal.classList.remove("hidden");
    } // Request form - general function to hide

  }, {
    key: "hideRequestForm",
    value: function hideRequestForm() {
      this.modalOverlay.classList.add("hidden");
      this.requestModal.classList.add("hidden");
      this.projectPageContainer.innerHTML = "";
    }
  }]);

  return RequestFormView;
}();

var _default = new RequestFormView();

exports.default = _default;
},{}],"js/views/ProjectPageView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProjectPageView = /*#__PURE__*/function () {
  function ProjectPageView() {
    _classCallCheck(this, ProjectPageView);
  } // Adds click functionality to all cards


  _createClass(ProjectPageView, [{
    key: "addProjectPage",
    value: function addProjectPage(allProjects) {
      var projectCard = document.querySelectorAll(".project-card-container");
      projectCard.forEach(function (card) {
        card.addEventListener("click", function (e) {
          // Prevents clicking on hard to activate
          if (e.target.classList.contains("project-card__heart")) return;
          var id = card.querySelector(".project-card__id").innerHTML;
          var projectPageContainer = document.querySelector(".project-pages");
          var modalOverlay = document.querySelector(".modal-overlay");
          var project = {};

          for (var i = 0; i < allProjects.length; i++) {
            if (id === allProjects[i][0]) {
              project = allProjects[i];
            }
          }

          var htmlString = "\n        <div class=\"project-page-container\">\n        <div class=\"project-page-content-container\">\n          <img\n            class=\"project-page-image\"\n            src=\"".concat(project[3], "\"\n            alt=\"\"\n          />\n          <div class=\"project-page-text-container\">\n            <h1>").concat(project[1], "</h1>\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque\n              nulla aliquid earum ducimus sit maxime aperiam dignissimos\n              reprehenderit nam! Aliquid, veritatis quos! Eum, doloribus odit.\n            </p>\n            <p class=\"project-page-eta\">Est. ETA: <br />12/12/2022</p>\n          </div>\n        </div>\n  \n        <div class=\"project-page-timeline-container\">\n          <ul class=\"project-page-timeline\">\n            <li class=\"timeline-active\">By 20/10/21<br />GB Completed</li>\n            <li>By 20/10/21<br />GB Completed</li>\n            <li>By 20/10/21<br />GB Completed</li>\n            <li>By 20/10/21<br />GB Completed</li>\n            <li>By 20/10/21<br />GB Completed</li>\n          </ul>\n        </div>\n  \n        <div class=\"project-page-support-form-container\">\n          <form action=\"\" class=\"support-form\">\n            <h2>Contact Owner</h2>\n            <label for=\"email\"></label>\n            <input\n              type=\"email\"\n              placeholder=\"Enter email...\"\n              name=\"email\"\n              required\n            />\n  \n            <label for=\"project\"></label>\n            <textarea\n              rows=\"5\"\n              name=\"project\"\n              placeholder=\"Enter project name...\"\n              required\n            ></textarea>\n            <div class=\"support-form-button-container\">\n              <button type=\"submit\" class=\"support-form-button\">Submit</button>\n            </div>\n          </form>\n        </div>\n      </div>");
          projectPageContainer.insertAdjacentHTML("beforeend", htmlString);
          modalOverlay.classList.toggle("hidden");
        });
      });
    }
  }]);

  return ProjectPageView;
}();

var _default = new ProjectPageView();

exports.default = _default;
},{}],"js/controller.js":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("./model"));

var _ResultsView = _interopRequireDefault(require("./views/ResultsView"));

var _PaginationView = _interopRequireDefault(require("./views/PaginationView"));

var _SearchBarView = _interopRequireDefault(require("./views/SearchBarView"));

var _RequestBarView = _interopRequireDefault(require("./views/RequestBarView"));

var _RequestFormView = _interopRequireDefault(require("./views/RequestFormView"));

var _ProjectPageView = _interopRequireDefault(require("./views/ProjectPageView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var reset = function reset() {
  // 1) Get the projects to load for page 1
  var setOfProjects = model.getSearchResultsPage(1, model.state.allProjects); // 2) Create cards based on the set of projects

  _ResultsView.default.render(setOfProjects); // 3) Render initial pagination buttons


  _PaginationView.default.render(model.state.search.totalPages, model.state.search.page); //   4) Add project page event listener


  _ProjectPageView.default.addProjectPage(model.state.allProjects);
};

var controlSearchResults = function controlSearchResults() {
  // 1) Get search query
  var query = _SearchBarView.default.getQuery(); // 2) Load search results into state.search.results


  model.loadSearchResults(query); // 3) Load sliced search results of certain page

  var setOfProjects = model.getSearchResultsPage(); // 4) Create cards based on the set of projects

  _ResultsView.default.render(setOfProjects); // 5) Render initial pagination buttons


  _PaginationView.default.render(model.state.search.totalPages, model.state.search.page);
};

var controlPagination = function controlPagination(goToPage) {
  // 1) Load sliced search results of certain page
  var setOfProjects = model.getSearchResultsPage(goToPage); // 2) Create cards based on the set of projects

  _ResultsView.default.render(setOfProjects); //   3) Render pagination buttons


  _PaginationView.default.render(model.state.search.totalPages, model.state.search.page);
};

var controlFavourited = function controlFavourited() {
  // 1) Load favourited projects
  model.loadFavouritedProjects(); // 2) Load sliced search results of certain page

  var setOfProjects = model.getSearchResultsPage(); // 3) Create cards based on the set of projects

  _ResultsView.default.render(setOfProjects); // 4) Render initial pagination buttons


  _PaginationView.default.render(model.state.search.totalPages, model.state.search.page);
};

var controlSearchBar = function controlSearchBar(entries) {
  _SearchBarView.default.fixSearchContainer(entries);
};

var controlRequestBar = function controlRequestBar(entries) {
  _RequestBarView.default.fixRequestBar(entries);
};

var controlShowModal = function controlShowModal() {
  _RequestFormView.default.showRequestForm();
};

var controlHideModal = function controlHideModal() {
  _RequestFormView.default.hideRequestForm();
};

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return model.createMatrix();

          case 2:
            //   2) Reset the system
            reset();

            _PaginationView.default.addHandlerClick(controlPagination);

            _ResultsView.default.addHandlerFavourited(controlFavourited, reset);

            _SearchBarView.default.addIntersectionObserver(controlSearchBar);

            _SearchBarView.default.addHandlerSearch(controlSearchResults);

            _RequestBarView.default.addIntersectionObserver(controlRequestBar);

            _RequestFormView.default.addHandlerClickBar(controlShowModal);

            _RequestFormView.default.addHandlerClickOverlay(controlHideModal);

            _RequestFormView.default.addHandlerEscape(controlHideModal);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init(); // Add JS for interest checker. Same layout. Just link to different things.
// Fix CSS for individual project page popup
// Fix the favourite issue
// Add "No favourited projects" if there are no projects
// Hook up to Netlify
},{"./model":"js/model.js","./views/ResultsView":"js/views/ResultsView.js","./views/PaginationView":"js/views/PaginationView.js","./views/SearchBarView":"js/views/SearchBarView.js","./views/RequestBarView":"js/views/RequestBarView.js","./views/RequestFormView":"js/views/RequestFormView.js","./views/ProjectPageView":"js/views/ProjectPageView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64717" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/controller.js"], null)
//# sourceMappingURL=/controller.f22f2928.js.map