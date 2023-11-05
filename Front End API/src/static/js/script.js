const sideBarBtn = document.querySelector(".sideBar-btn");
const sideBar = document.querySelector(".sideBar");
const sideBarLinks = document.querySelector(".sideBar-links");
const clickableRows = document.querySelectorAll(".clickable-row");

// Sidebar active link
document.getElementById(`sidebar-${location.pathname.split('/')[1]}`)?.classList.add('sideBar-link-active');

// Check if navbar expanded
function showHideNavbar() {
  let navbarExpandFlag = JSON.parse(sessionStorage.getItem('navbar-expand')) ;
  if (navbarExpandFlag === null) {
    sessionStorage.setItem('navbar-expand', true);
    navbarExpandFlag = true;
  }

  if (navbarExpandFlag ) {
    sideBar.classList.remove("sideBar-hide");
    sideBarLinks.classList.remove("sideBar-links-hide");
  } else if (!navbarExpandFlag ) {
    sideBar.classList.add("sideBar-hide");
    sideBarLinks.classList.add("sideBar-links-hide");
  }
}

showHideNavbar();


sideBarBtn.addEventListener("click", function () {
  const navbarExpandFlag = JSON.parse(sessionStorage.getItem('navbar-expand'));
  sessionStorage.setItem('navbar-expand', !navbarExpandFlag);
  showHideNavbar(!navbarExpandFlag);
});

window.addEventListener("resize", () => {
  showHideNavbar(window.innerWidth <= 576);
});

clickableRows.forEach((el) => {
  el.addEventListener("click", (ev) => {
    window.open(el.dataset.href);
  });
});

