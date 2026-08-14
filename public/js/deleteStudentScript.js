const deleteStudent = document.querySelector("#deleteStudent");
const deleteStudentForm = document.querySelector(".deleteStudentFormContainer");
const deleteStudentResult = document.querySelector("#deleteStudentResult");

deleteStudent.addEventListener("click", () => {
  showForm(deleteStudentForm);
});

deleteStudentForm.addEventListener("submit", () => {
  event.preventDefault();
  deleteStudentByRegNo();
});

deleteStudentForm.addEventListener("reset", () => {
  deleteStudentResult.innerHTML = "";
});

async function deleteStudentByRegNo() {
  const regNo = document.querySelector(
    ".deleteStudentFormContainer .inputFields [name = 'regNo'",
  ).value;
  const confirmDelete = confirm(`Delete Student with Reg No ${regNo}`);
  if (!confirmDelete) return;
  try {
    const response = await axios.delete(`/students/${regNo}`);
    deleteStudentResult.innerHTML = response.data;
  } catch (error) {
    if (error.response) {
      deleteStudentResult.innerHTML = error.response.data;
    } else {
      deleteStudentResult.innerHTML = error.message;
    }
  }
}
