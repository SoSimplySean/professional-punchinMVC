class ProjectPageView {
  constructor() {}

  // Adds click functionality to all cards
  addProjectPage(allProjects) {
    const projectCard = document.querySelectorAll(`.project-card-container`);

    projectCard.forEach(function (card) {
      card.addEventListener(`click`, function (e) {
        // Prevents clicking on hard to activate
        if (e.target.classList.contains("project-card__heart")) return;

        const id = card.querySelector(".project-card__id").innerHTML;
        const projectPageContainer = document.querySelector(`.project-pages`);
        const modalOverlay = document.querySelector(".modal-overlay");

        let project = {};

        for (let i = 0; i < allProjects.length; i++) {
          if (id === allProjects[i][0]) {
            project = allProjects[i];
          }
        }

        const htmlString = `
        <div class="project-page-container">
        <div class="project-page-content-container">
          <img
            class="project-page-image"
            src="${project[3]}"
            alt=""
          />
          <div class="project-page-text-container">
            <h1>${project[1]}</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              nulla aliquid earum ducimus sit maxime aperiam dignissimos
              reprehenderit nam! Aliquid, veritatis quos! Eum, doloribus odit.
            </p>
            <p class="project-page-eta">Est. ETA: <br />12/12/2022</p>
          </div>
        </div>
  
        <div class="project-page-timeline-container">
          <ul class="project-page-timeline">
            <li class="timeline-active">By 20/10/21<br />GB Completed</li>
            <li>By 20/10/21<br />GB Completed</li>
            <li>By 20/10/21<br />GB Completed</li>
            <li>By 20/10/21<br />GB Completed</li>
            <li>By 20/10/21<br />GB Completed</li>
          </ul>
        </div>
  
        <div class="project-page-support-form-container">
          <form action="" class="support-form">
            <h2>Contact Owner</h2>
            <label for="email"></label>
            <input
              type="email"
              placeholder="Enter email..."
              name="email"
              required
            />
  
            <label for="project"></label>
            <textarea
              rows="5"
              name="project"
              placeholder="Enter project name..."
              required
            ></textarea>
            <div class="support-form-button-container">
              <button type="submit" class="support-form-button">Submit</button>
            </div>
          </form>
        </div>
      </div>`;

        projectPageContainer.insertAdjacentHTML(`beforeend`, htmlString);

        modalOverlay.classList.toggle("hidden");
      });
    });
  }
}

export default new ProjectPageView();
