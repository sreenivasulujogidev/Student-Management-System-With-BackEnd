const getAllStudents = document.querySelector("#getAllStudents");
const getAllStudentsResult = document.querySelector(
  "#StudentDetailsByRegNoContainer",
);
getAllStudents.addEventListener("click", () => {
  closeAllForms();
  getAllStudentsData();
});

async function getAllStudentsData() {
  try {
    const response = await axios.get("/students");

    let rows = "";

    response.data.forEach((student) => {
      rows += `
                <tr>
                    <td>${student.regNo}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>${student.branch}</td>
                    <td>${student.cgpa}</td>
                </tr>
            `;
    });

    getAllStudentsResult.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
  } catch (error) {
    if (error.response) {
      getAllStudentsResult.innerHTML = error.response.data.message;
    } else {
      getAllStudentsResult.innerHTML = error.message;
    }
  }
}

function closeAllForms() {
  document.querySelectorAll(".studentForm").forEach((element) => {
    element.style.display = "none";
  });
}
