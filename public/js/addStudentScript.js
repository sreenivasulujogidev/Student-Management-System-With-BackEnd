const addStudentForm = document.querySelector(".AddStudentFormContainer");
const AddStudentresult = document.querySelector("#result");
const AddStudent = document.querySelector("#AddStudent");

AddStudent.addEventListener("click", () => {
  showForm(addStudentForm);
});

addStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getStudents();
});

if (addStudentForm.style.display === "block") {
  AddStudentresult.innerHTML = "";
}

addStudentForm.addEventListener("reset", () => {
  AddStudentresult.innerHTML = "";
});

async function getStudents() {
  const data = Object.fromEntries(new FormData(addStudentForm));
  try {
    const response = await axios.post("/students", data);
    const { status, data: responseMessage } = response;
    AddStudentresult.innerHTML = responseMessage;
  } catch (error) {
    if (error.response) {
      AddStudentresult.innerHTML = error.response.data.message;
    } else {
      AddStudentresult.innerHTML = error.message;
    }
  }
}

function showForm(form) {
  document.querySelectorAll(".studentForm").forEach((element) => {
    element.style.display = "none";
    element.reset();
  });
  document.querySelectorAll(".FormResult").forEach((element) => {
    element.innerHTML = "";
  });
  form.style.display = "block";
}
