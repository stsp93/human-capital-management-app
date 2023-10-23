const sideBarBtn = document.querySelector(".sideBar-btn");
const sideBar = document.querySelector(".sideBar");
const sideBarLinks = document.querySelector(".sideBar-links");
const clickableRows = document.querySelectorAll(".clickable-row");

sideBarBtn.addEventListener("click", function () {
  sideBar.classList.toggle("sideBar-hide");

  sideBarLinks.classList.toggle("sideBar-links-hide");
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 576) {
    sideBar.classList.add("sideBar-hide");
    sideBarLinks.classList.add("sideBar-links-hide");
  } else {
    sideBar.classList.remove("sideBar-hide");
    sideBarLinks.classList.remove("sideBar-links-hide");
  }
});

clickableRows.forEach((el) => {
  el.addEventListener("click", (ev) => {
    window.document.location = el.dataset.href;
  });
});