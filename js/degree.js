function addUserInputToTable(e, values, tbody) {
  e.preventDefault();
  var tr = document.createElement("tr");
  Object.values(values).forEach((value) => {
    if (value == null || undefined) {
      value = "";
    }
    var td = document.createElement("td");
    td.innerHTML += value;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
}

function hideErrorMessage(errorMessage) {
  errorMessage.style.display = "none";
}

function showErrorMessage(errorMessage) {
  errorMessage.style.display = "block";
}

function clearFieldsDegree() {
  document.getElementById("degreeNameUserInput").value = "";
  document.getElementById("degreeIdUserInput").value = "";
  document.getElementById("degreeLoUserInput").value = "";
}
var submitDegreeButton = document.getElementById("submitDegreeButton");
if (submitDegreeButton) {
  submitDegreeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    var degreeField = document.getElementById("fillInFieldDegree");
    var tableBody = document.getElementById("tbody");
    var degreeAcademicUserInput = document.getElementById(
      "degreeAcademicUserInput"
    ).value;
    var degreeNameUserInput = document.getElementById(
      "degreeNameUserInput"
    ).value;
    var degreeIdUserInput = document.getElementById("degreeIdUserInput").value;
    var degreeLoUserInput = document.getElementById("degreeLoUserInput").value;
    if (
      degreeIdUserInput &&
      degreeAcademicUserInput &&
      degreeLoUserInput &&
      degreeNameUserInput !== ""
    ) {
      addUserInputToTable(
        evt,
        {
          name: degreeNameUserInput,
          id: degreeIdUserInput,
          academic: degreeAcademicUserInput,
          learningOutcomes: degreeLoUserInput,
        },
        tableBody
      );
      hideErrorMessage(degreeField);
      clearFieldsDegree();
    } else {
      showErrorMessage(degreeField);
      return false;
    }
  });
}
function createDegreesHtmlForDegreesPage(degrees) {
  var degree_module = document.getElementById("degreeTable");
  for (var i = 0; i < degrees.length; ++i) {
    var objects = degrees[i];
    var row = document.createElement("tr");
    var properties = ["Name", "ID", "Academic", "Learning_outcomes"];
    for (var j = 0; j < properties.length; ++j) {
      var cell = document.createElement("td");
      cell.innerHTML = objects[properties[j]];
      row.appendChild(cell);
    }
    degree_module.appendChild(row);
  }
}
fetch(
  // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
  "/json/degree_data.json"
)
  .then((response) => response.json())
  .then((response) => {
    var degree_module = document.getElementById("degreeTable");
    if (degree_module) {
      createDegreesHtmlForDegreesPage(response);
    }
  });

var academicTitle = document.getElementById("academicTitle");
var HODTitle = document.getElementById("HODTitle");
var createModule = document.getElementById("createModule");
var createDegree = document.getElementById("createDegree");
var createAssesments = document.getElementById("createAssesments");
var dmaTitle = document.getElementById("dmaTitle");

academicTitle.classList.add("activeLinks");
createDegree.classList.add("activeLinks");

academicTitle.addEventListener("click", function () {
  academicTitle.classList.add("activeLinks");
  HODTitle.classList.remove("activeLinks");
});
HODTitle.addEventListener("click", function () {
  HODTitle.classList.add("activeLinks");
  academicTitle.classList.remove("activeLinks");
});
