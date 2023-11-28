var side_nav = document.getElementById("side-nav");
var toggler = document.getElementById("menu-toggler");

side_nav.style.left = "-300px";
toggler.onclick = function () {
  if (side_nav.style.left == "-300px") {
    side_nav.style.left = "0";
  } else {
    side_nav.style.left = "-300px";
  }
};
$(document).ready(function () {
  $(toggler).on("click", function () {
    $(this).toggleClass("open");
    $(side_nav).toggleClass("open");
  });
  $(side_nav.nav - link).on("click", function () {
    $(toggler).removeClass("open");
    $(side_nav).removeClass("open");
  });

  on("click", toggler, function (e) {
    select("body").classList.toggle("menu-toggler-active");
    this.classList.toggle();
    this.classList.toggle();
  });

  // UP arrow Js

  $("#up").on("click", function () {
    $("html, body").animate(
      keyframes,
      {
        scrollTop: 0,
      },
      options,
      5000
    );
  });

  AOS.init({
    easing: "ease",
    duration: 1800,
  });
});
/**
 * Skills animation
 */
let skilsContent = select(".coding-skills");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      let progress = select(".progress .progress-bar", true);
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}
