class ResultsView {
  constructor() {
    this.projectList = document.querySelector(`.projects`);
    this.header__user = document.querySelector(`.header__user`);
  }

  addHandlerFavourited(handler, reset) {
    this.header__user.addEventListener("click", function () {
      this.classList.toggle("activeUser");
      if (this.classList.contains("activeUser")) {
        handler();
      } else {
        reset();
      }
    });
  }

  render(data) {
    this.projectList.innerHTML = "";

    // For each row (array), create a HTML card
    data.forEach((project) => {
      const htmlString = `
            <li class="project-card-container">
                <img
                src="${project[3]}"
                alt=""
                class="project-card__img"
                />
                <div class="project-card__text-container">
                <div>
                <p class="project-card__id" style="display: none;">${project[0]}</p>
                <h2 class="project-card__title">${project[1]}</h2>
                <p class="project-card__eta">Est. ${project[2]}</p>
                </div>
                <i class="project-card__heart bi bi-suit-heart"></i>
                </div>
            </li>`;

      this.projectList.insertAdjacentHTML(`beforeend`, htmlString);
    });

    const likeProject = document.querySelectorAll(".project-card__heart");

    // FAVOURITE PROJECTS
    // Putting it here for now since it only works after items load
    likeProject.forEach(function (item) {
      // Activate heart if it is in local storage
      // Gets the ID of the project card
      const id =
        item.closest("div div").firstElementChild.firstElementChild.innerText;

      for (let i = 0; i < localStorage.length; i++) {
        if (id == localStorage.key(i)) {
          item.classList.remove("bi-suit-heart");
          item.classList.add("bi-suit-heart-fill");
          item.classList.add("heart");
        }
      }

      item.addEventListener("click", function () {
        item.classList.toggle("bi-suit-heart-fill");
        item.classList.toggle("bi-suit-heart");
        item.classList.toggle("heart");

        // Checks whether the project was saved and adds/removes from local storage
        if (item.classList.contains("heart")) {
          localStorage.setItem(id, id);
        } else {
          localStorage.removeItem(id, id);
        }
      });
    });
  }
}

export default new ResultsView();
