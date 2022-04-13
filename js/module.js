var academicTitle = document.getElementById("academicTitle");
var HODTitle = document.getElementById("HODTitle");
var createModule = document.getElementById("createModule");
var createDegree = document.getElementById("createDegree");
var createAssesments = document.getElementById("createAssesments");
var dmaTitle = document.getElementById("dmaTitle");
var modTimeSlots = document.getElementById("modTimeSlots");

academicTitle.classList.add("activeLinks");
createModule.classList.add("activeLinks");
academicTitle.addEventListener("click", function () {
  academicTitle.classList.add("activeLinks");
  HODTitle.classList.remove("activeLinks");
});
HODTitle.addEventListener("click", function () {
  HODTitle.classList.add("activeLinks");
  academicTitle.classList.remove("activeLinks");
});

function clearFieldsModule() {
  document.getElementById("moduleIdUserInput").value = "";
  document.getElementById("moduleLoUserInput").value = "";
  document.getElementById("moduleNameUserInput").value = "";
  document.getElementById("moduleNohUserInput").value = "";
  document.getElementById("moduleNocUserInput").value = "";
}

function hideErrorMessage(errorMessage) {
  errorMessage.style.display = "none";
}

function showErrorMessage(errorMessage) {
  errorMessage.style.display = "block";
}

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

var submitModuleButton = document.getElementById("submitModuleButton");
if (submitModuleButton) {
  submitModuleButton.addEventListener("click", function (e) {
    e.preventDefault();
    var moduleField = document.getElementById("fillInFieldModule");
    var tableBody = document.getElementById("tbodyModule");
    var moduleAcademicUserInput = document.getElementById(
      "moduleAcademicUserInput"
    ).value;
    var moduleNameUserInput = document.getElementById(
      "moduleNameUserInput"
    ).value;
    var moduleIdUserInput = document.getElementById("moduleIdUserInput").value;
    var moduleLoUserInput = document.getElementById("moduleLoUserInput").value;
    var moduleNohUserInput =
      document.getElementById("moduleNohUserInput").value;
    var moduleNocUserInput =
      document.getElementById("moduleNocUserInput").value;
    if (
      moduleNameUserInput &&
      moduleIdUserInput &&
      moduleLoUserInput &&
      moduleNohUserInput &&
      moduleNocUserInput !== ""
    ) {
      addUserInputToTable(
        e,
        {
          name: moduleNameUserInput,
          id: moduleIdUserInput,
          numberOfCredits: moduleNocUserInput,
          numberOfHours: moduleNohUserInput,
          acedemic: moduleAcademicUserInput,
          learningOutcomes: moduleLoUserInput,
        },
        tableBody
      );
      hideErrorMessage(moduleField);
      clearFieldsModule();
    } else {
      showErrorMessage(moduleField);
      return false;
    }
  });
}

function createModuleOptionsForModulePage(modules) {
  var table_module = document.getElementById("moduleTable");
  if (table_module) {
    for (var i = 0; i < modules.length; ++i) {
      var objects = modules[i];
      var row = document.createElement("tr");
      var properties = [
        "Name",
        "ID",
        "Number_of_credits",
        "Number_of_hours",
        "Academic",
        "Learning_outcomes",
      ];

      for (var j = 0; j < properties.length; ++j) {
        var cell = document.createElement("td");
        cell.innerHTML = objects[properties[j]];
        row.appendChild(cell);
      }
      table_module.appendChild(row);
    }
  }
}
fetch(
  // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
  "/json/module_data.json"
)
  .then((response) => response.json())
  .then((response) => {
    createModuleOptionsForModulePage(response);
  });
