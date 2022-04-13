function clearFieldsAssessments() {
  document.getElementById("assessmentTitleUserInput").value = "";
  document.getElementById("assessmentLoUserInput").value = "";
  document.getElementById("assessmentNumberUserInput").value = "";
  document.getElementById("assessmentVolumeUserInput").value = "";
  document.getElementById("assessmentWeightingUserInput").value = "";
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
var submitAssessmentButton = document.getElementById("submitAssessmentButton");

if (submitAssessmentButton) {
  submitAssessmentButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    var assessmentField = document.getElementById("fillInFieldAssessment");
    var tableBody = document.getElementById("tbodyAssessment");
    var assessmentTitleUserInput = document.getElementById(
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
          title: assessmentTitleUserInput,
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
}

fetch(
  // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
  "/json/assessment_data.json"
)
  .then((response) => response.json())
  .then((response) => {
    var assessmentTable = document.getElementById("assessmentTable");
    if (assessmentTable) {
      const object_data = response;
      for (var i = 0; i < object_data.length; ++i) {
        var objects = object_data[i];
        var row = document.createElement("tr");
        var properties = [
          "Title",
          "Number",
          "Weighting",
          "Volume",
          "Submission_Date",
          "Learning_outcomes",
        ];
        for (var j = 0; j < properties.length; ++j) {
          var cell = document.createElement("td");
          cell.innerHTML = objects[properties[j]];
          row.appendChild(cell);
        }
        assessmentTable.appendChild(row);
      }
    }
  });

var academicTitle = document.getElementById("academicTitle");
var HODTitle = document.getElementById("HODTitle");
var createModule = document.getElementById("createModule");
var createDegree = document.getElementById("createDegree");
var createAssesments = document.getElementById("createAssesments");
var dmaTitle = document.getElementById("dmaTitle");

academicTitle.classList.add("activeLinks");
createAssesments.classList.add("activeLinks");

academicTitle.addEventListener("click", function () {
  academicTitle.classList.add("activeLinks");
  HODTitle.classList.remove("activeLinks");
});
HODTitle.addEventListener("click", function () {
  HODTitle.classList.add("activeLinks");
  academicTitle.classList.remove("activeLinks");
});
