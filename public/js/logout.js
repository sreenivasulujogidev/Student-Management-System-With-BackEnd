const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure You want to Logout ?");
  if (!confirmLogout) return;
  doLogout();
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
