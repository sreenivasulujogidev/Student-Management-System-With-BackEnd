const Setting = document.querySelector("#Setting");
const Box = document.querySelector("#Box");
const Setting_icon = document.querySelector("#Setting-icon");

Setting.addEventListener("click", () => {
  Box.classList.toggle("visible");
  Setting_icon.classList.add("rotate");
});

document.addEventListener("click", (event) => {
  if (!Setting.contains(event.target) && !Box.contains(event.target)) {
    Box.classList.remove("visible");
    Setting_icon.classList.remove("rotate");
  }
});
