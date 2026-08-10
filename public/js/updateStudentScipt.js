const updateStudent = document.querySelector("#updateStudent");
const updateStudentForm = document.querySelector(".UpdateStudentFormContainer");
const UpdateResult = document.querySelector("#UpdateResult");

updateStudent.addEventListener("click", () => {
  showForm(updateStudentForm);
});

updateStudentForm.addEventListener("submit", () => {
  event.preventDefault();
  updateStudentData();
});

async function updateStudentData() {
  const formData = new FormData(updateStudentForm);
  updatedFormData = Object.fromEntries(
    [...formData].filter((field) => field[1] !== ""),
  );
  const regNo = updatedFormData.regNo;
  delete updatedFormData.regNo;
  if (Object.keys(updatedFormData).length === 0) {
    UpdateResult.innerHTML = "Enter any Field to Change";
    return;
  }
  try {
    const response = await axios.patch(`/students/${regNo}`, updatedFormData);
    UpdateResult.innerHTML = response.data;
  } catch (error) {
    if (error.response) {
      UpdateResult.innerHTML = error.response.data;
    } else {
      UpdateResult.innerHTML = error.message;
    }
  }
}
