const getStudentForm = document.querySelector(".getStudentFormContainer");
const getStudent = document.querySelector("#getStudent");
const result = document.querySelector("#StudentDetailsByRegNoContainer");

getStudent.addEventListener("click", () => {
  showForm(getStudentForm);
});

getStudentForm.addEventListener("submit", () => {
  event.preventDefault();
  getStudentByRegNo();
});

async function getStudentByRegNo() {
  try {
    const regNo = document.querySelector(
      ".getStudentFormContainer .inputFields [name='regNo']",
    ).value;
    console.log(regNo);
    const response = await axios.get(`/students/${regNo}`);
    const {
      regNo: registrationNumber,
      name,
      age,
      branch,
      cgpa,
    } = response.data;
    result.innerHTML = `<table>
      <tbody>
        <tr>
          <th>Reg No</th>
          <td>${registrationNumber}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>${name}</td>
        </tr>
        <tr> 
           <th>Age</th>
           <td>${age} </td>
        </tr>
        <tr>
          <th>Branch</th>
          <td>${branch}</td>
        </tr>
        <tr>
          <th>CGPA</th>
          <td>${cgpa}</td>
        </tr>
      </tbody>
    </table>`;
  } catch (error) {
    if (error.response) {
      result.innerHTML = error.response.data;
    } else {
      result.innerHTML = error.message;
    }
  }
}
