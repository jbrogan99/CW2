function clearFieldsAssessments() {
  //clearing input fields for assessment
  document.getElementById("assessmentTitleUserInput").value = "";
  document.getElementById("assessmentLoUserInput").value = "";
  document.getElementById("assessmentNumberUserInput").value = "";
  document.getElementById("assessmentVolumeUserInput").value = "";
  document.getElementById("assessmentWeightingUserInput").value = "";
}
function addUserInputToTable(e, values, tbody) {
  //Adding user input to the table
  e.preventDefault();
  var tr = document.createElement("tr");
  Object.values(values).forEach((value) => {
    //looping through objects (user inputs)
    if (value == null || undefined) {
      value = "";
    }
    var td = document.createElement("td"); //creating table data
    td.innerHTML += value; // assigning user input to table data
    tr.appendChild(td); // appending user inputs to tr
  });
  tbody.appendChild(tr); // appending table row to table body
}

function hideErrorMessage(errorMessage) {
  errorMessage.style.display = "none";
}

function showErrorMessage(errorMessage) {
  errorMessage.style.display = "block";
}
var submitAssessmentButton = document.getElementById("submitAssessmentButton");

submitAssessmentButton.addEventListener("click", function (evt) {
  //click function
  evt.preventDefault(); //prevent submit from firing on page load
  var assessmentField = document.getElementById("fillInFieldAssessment");
  var tableBody = document.getElementById("tbodyAssessment");
  var assessmentTitleUserInput = document.getElementById(
    // gathering input values
    "assessmentTitleUserInput"
  ).value;
  var assessmentLoUserInput = document.getElementById(
    "assessmentLoUserInput"
  ).value;
  var assessmentNumberUserInput = document.getElementById(
    "assessmentNumberUserInput"
  ).value;
  var assessmentVolumeUserInput = document.getElementById(
    "assessmentVolumeUserInput"
  ).value;
  var assessmentWeightingUserInput = document.getElementById(
    "assessmentWeightingUserInput"
  ).value;
  var assessmentSubmissionUserInput = document.getElementById(
    "assessmentSubmissionUserInput"
  ).value;

  if (
    assessmentTitleUserInput &&
    assessmentLoUserInput &&
    assessmentNumberUserInput &&
    assessmentVolumeUserInput &&
    assessmentWeightingUserInput !== ""
  ) {
    addUserInputToTable(
      evt,
      {
        title: assessmentTitleUserInput, // instantiate objects values
        number: assessmentNumberUserInput,
        weighting: assessmentWeightingUserInput,
        volume: assessmentVolumeUserInput,
        submission: assessmentSubmissionUserInput,
        learningOutcomes: assessmentLoUserInput,
      },
      tableBody
    );
    hideErrorMessage(assessmentField);
    clearFieldsAssessments();
  } else {
    showErrorMessage(assessmentField);
  }
});

fetch(
  // fetch request for assessment data
  "/json/assessment_data.json"
)
  .then((response) => response.json())
  .then((response) => {
    var assessmentTable = document.getElementById("assessmentTable");
    if (assessmentTable) {
      const object_data = response;
      for (var i = 0; i < object_data.length; ++i) {
        // loop over data retuned from response
        var objects = object_data[i];
        var row = document.createElement("tr");
        var properties = [
          // keys from json file
          "Title",
          "Number",
          "Weighting",
          "Volume",
          "Submission_Date",
          "Learning_outcomes",
        ];
        for (var j = 0; j < properties.length; ++j) {
          // loop over keys
          var cell = document.createElement("td");
          cell.innerHTML = objects[properties[j]]; // add data to keys
          row.appendChild(cell); // add row to data
        }
        assessmentTable.appendChild(row); // add table to row
      }
    }
  });

var academicTitle = document.getElementById("academicTitle");
// var HODTitle = document.getElementById("HODTitle");
// var createModule = document.getElementById("createModule");
// var createDegree = document.getElementById("createDegree");
var createAssesments = document.getElementById("createAssesments");
//var dmaTitle = document.getElementById("dmaTitle");

academicTitle.classList.add("activeLinks"); // add active links
createAssesments.classList.add("activeLinks");

// academicTitle.addEventListener("click", function () {
//   academicTitle.classList.add("activeLinks");
//   HODTitle.classList.remove("activeLinks");
// });
// HODTitle.addEventListener("click", function () {
//   HODTitle.classList.add("activeLinks");
//   academicTitle.classList.remove("activeLinks");
// });
