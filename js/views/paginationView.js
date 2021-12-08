class PaginationView {
  constructor() {
    this.pagination__buttons = document.querySelector(".pagination__buttons");
  }

  addHandlerClick(handler) {
    this.pagination__buttons.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__button");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  render(totalPages, currentPage) {
    let buttons = ``;
    let activeButton;
    let beforePage = currentPage - 1;
    let afterPage = currentPage + 1;

    // Adds previous button
    if (currentPage > 1) {
      buttons += `<li class="pagination__button pagination__prev" data-goto="${
        currentPage - 1
      }"><i class="bi bi-chevron-left"></i></li>`;
    }

    // Adds three page numbers at all times
    for (let page = beforePage; page <= afterPage; page++) {
      if (page > totalPages) {
        continue;
      }

      if (page == 0) {
        page = page + 1;
      }

      // Makes center page active and highlighted
      if (page == currentPage) {
        activeButton = `active`;
      } else {
        activeButton = ``;
      }

      buttons += `<li class="pagination__button pagination__number ${activeButton}" data-goto="${page}"><span>${page}</span></li>`;
    }

    // Adds next button
    if (currentPage < totalPages) {
      buttons += `<li class="pagination__button pagination__next"  data-goto="${
        currentPage + 1
      }"><i class="bi bi-chevron-right"></i></li>`;
    }

    this.pagination__buttons.innerHTML = buttons;
  }
}
export default new PaginationView();
