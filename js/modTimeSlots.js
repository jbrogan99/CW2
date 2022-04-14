var academicTitle = document.getElementById("academicTitle");
var modTimeSlots = document.getElementById("modTimeSlots");

modTimeSlots.classList.add("activeLinks");
HODTitle.classList.add("activeLinks");

academicTitle.addEventListener("click", function () {
  academicTitle.classList.add("activeLinks");
  HODTitle.classList.remove("activeLinks");
});
HODTitle.addEventListener("click", function () {
  HODTitle.classList.add("activeLinks");
  academicTitle.classList.remove("activeLinks");
});

function clearHODInputField() {
  document.getElementById("academicUserInput").value = "";
  document.getElementById("timeSlotUserInput").value = "";
  document.getElementById("roomUserInput").value = "";
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

function hideErrorMessage(errorMessage) {
  errorMessage.style.display = "none";
}

function showErrorMessage(errorMessage) {
  errorMessage.style.display = "block";
}

var submitButton2 = document.getElementById("submitButton2");
submitButton2.addEventListener("click", function (e) {
  e.preventDefault();
  var module_options = document.getElementById("module_options").value;
  var academicUserInput = document.getElementById("academicUserInput").value;
  var timeSlotUserInput = document.getElementById("timeSlotUserInput").value;
  var roomUserInput = document.getElementById("roomUserInput").value;
  var tbody = document.getElementById("tbodyTimeSlots");
  if (
    module_options &&
    academicUserInput &&
    timeSlotUserInput &&
    roomUserInput
  ) {
    addUserInputToTable(
      e,
      {
        module_options: module_options,
        academicUserInput: academicUserInput,
        timeSlotUserInput: timeSlotUserInput,
        roomUserInput: roomUserInput,
      },
      tbody
    ),
      hideErrorMessage(fillInFieldModuleDegree);
    clearHODInputField();
  } else {
    showErrorMessage(fillInFieldModuleDegree);
  }
});

fetch(
  // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
  "/json/module_data.json"
)
  .then((response) => response.json())
  .then((response) => {
    createModuleOptionsForDegreeAndModulePage(response);
  });

function createModuleOptionsForDegreeAndModulePage(modules) {
  var module_options = document.getElementById("module_options");
  for (var j = 0; j < modules.length; ++j) {
    var names = modules[j];
    var optionsTag = document.createElement("option");
    optionsTag.innerHTML = names.Name;
    module_options.appendChild(optionsTag);
  }
}
