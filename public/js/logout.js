const logout = document.querySelector("#logoutBox");
const confirmLogoutBox = document.querySelector("#confirmLogoutBox");
const logout_YES = document.querySelector("#logout_YES");
const logout_NO = document.querySelector("#logout_NO");
const logout_overlay = document.querySelector("#logout-overlay");

logout.addEventListener("click", () => {
  confirmLogoutBox.classList.add("showLogoutBox");
  logout_overlay.style.display = "block";
});

logout_YES.addEventListener("click", () => {
  doLogout();
});

logout_NO.addEventListener("click", () => {
  confirmLogoutBox.classList.remove("showLogoutBox");
  logout_overlay.style.display = "none";
  return;
});

async function doLogout() {
  try {
    const response = await axios.post("/logout");
    window.location.href = response.data.redirectTo;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
