var academicTitle = document.getElementById("academicTitle");
var HODTitle = document.getElementById("HODTitle");
var createModule = document.getElementById("createModule");
var createDegree = document.getElementById("createDegree");
var createAssesments = document.getElementById("createAssesments");
var dmaTitle = document.getElementById("dmaTitle");
var modTimeSlots = document.getElementById("modTimeSlots");

academicTitle.classList.add("activeLinks");
dmaTitle.classList.add("activeLinks");
academicTitle.addEventListener("click", function () {
  academicTitle.classList.add("activeLinks");
  HODTitle.classList.remove("activeLinks");
});
HODTitle.addEventListener("click", function () {
  HODTitle.classList.add("activeLinks");
  academicTitle.classList.remove("activeLinks");
});

var weightingResponse;

document.addEventListener("DOMContentLoaded", function (event) {
  var degreesData;
  var assessmentData;

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

  var submitAllButton = document.getElementById("submitAllButton");
  if (submitAllButton) {
    submitAllButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      var errorMessage = document.getElementById("fillInFieldModuleDegree");

      var moduleSelectTag = document.getElementById("module_options").value;
      var tableBody = document.getElementById("tbodyModuleDegree");

      var degree_selectValue = document.getElementById("degree_select").value;
      var assessment_selectValue =
        document.getElementById("assessment_select").value;

      var degree_select1 = document.getElementById("degree_select1");
      var degree_select2 = document.getElementById("degree_select2");

      var assessment_select1 = document.getElementById("assessment_select1");
      var assessment_select2 = document.getElementById("assessment_select2");
      var numberFromString = /\d+/;

      var assessment_selectValue =
        document.getElementById("assessment_select").value;
      percentageValue = assessment_selectValue.match(numberFromString);
      percentage = parseInt(percentageValue);

      if (degree_select1) {
        var degree_select1Value =
          document.getElementById("degree_select1").value;
      }
      if (degree_select2) {
        var degree_select2Value =
          document.getElementById("degree_select2").value;
      }

      if (assessment_select1) {
        var assessment_select1Value =
          document.getElementById("assessment_select1").value;
        percentage1Value = assessment_select1Value.match(numberFromString);
        percentage1 = parseInt(percentage1Value);
      }
      if (assessment_select2) {
        var assessment_select2Value =
          document.getElementById("assessment_select2").value;
        percentage2Value = assessment_select2Value.match(numberFromString);
        percentage2 = parseInt(percentage2Value);
      }

      var percentage;
      console.log("percentage" + " " + percentage);
      var percentage1;
      console.log("percentage" + " " + percentage1);
      var percentage2;
      console.log("percentage" + " " + percentage2);

      var p1AndP2 = percentage + percentage1;
      var p1AndP2andP3 = percentage + percentage1 + percentage2;
      if (
        percentage == 100 &&
        percentage1 == undefined &&
        percentage2 == undefined
      ) {
        addUserInputToTable(
          evt,
          {
            moduleSelectTag: moduleSelectTag,
            degree_select: degree_selectValue,
            degree_select1: degree_select1Value,
            degree_select2: degree_select2Value,
            assessment_select: assessment_selectValue,
            assessment_select1: " ",
            assessment_select2: " ",
          },
          tableBody
        );
        hideErrorMessage(errorMessage);
      } else {
        showErrorMessage(errorMessage);
      }
      if (percentage && percentage1) {
        if (p1AndP2 == 100 && percentage2 == undefined) {
          addUserInputToTable(
            evt,
            {
              moduleSelectTag: moduleSelectTag,
              degree_select: degree_selectValue,
              degree_select1: degree_select1Value,
              degree_select2: degree_select2Value,
              assessment_select: assessment_selectValue,
              assessment_select1: assessment_select1Value,
              assessment_select2: " ",
            },
            tableBody
          );
          hideErrorMessage(errorMessage);
        } else {
          showErrorMessage(errorMessage);
        }
      }
      if (percentage && percentage1 && percentage2) {
        if (p1AndP2andP3 == 100) {
          addUserInputToTable(
            evt,
            {
              moduleSelectTag: moduleSelectTag,
              degree_select: degree_selectValue,
              degree_select1: degree_select1Value,
              degree_select2: degree_select2Value,
              assessment_select: assessment_selectValue,
              assessment_select1: assessment_select1Value,
              assessment_select2: assessment_select2Value,
            },
            tableBody
          );
          hideErrorMessage(errorMessage);
        } else {
          showErrorMessage(errorMessage);
        }
      }
    });
  }

  function createModuleOptionsForDegreeAndModulePage(modules) {
    var module_options = document.getElementById("module_options");
    for (var j = 0; j < modules.length; ++j) {
      var names = modules[j];
      var optionsTag = document.createElement("option");
      optionsTag.innerHTML = names.Name;
      module_options.appendChild(optionsTag);
    }
  }

  fetch(
    // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
    "/json/module_data.json"
  )
    .then((response) => response.json())
    .then((response) => {
      createModuleOptionsForDegreeAndModulePage(response);
    });

  fetch(
    // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
    "/json/degree_data.json"
  )
    .then((response) => response.json())
    .then((response) => {
      degreesData = response;
      addAnotherDegreesDropdown("", response, true);
      count = 1;

      var plusSign = document.getElementById("plusSign");
      plusSign.addEventListener("click", function (e) {
        if (count < 3) {
          addAnotherDegreesDropdown(count, degreesData, false);
          count++;
        }
        // adding input fields
        e.preventDefault();
      });
      console.log(count);

      var minusSign = document.getElementById("minusSign");
      minusSign.addEventListener("click", function (e) {
        console.log(count);
        if (count > 1) {
          count--;
          removeInputBox(count);
        }
      });
    });

  function removeInputBox(count) {
    console.log(count);
    var degreeOptiontag = document.getElementById("degree_option" + count);
    var degreeSelecttag = document.getElementById("degree_select" + count);
    var degreeSpantag = document.getElementById("Span" + count);
    var degreeFlextContainer = document.getElementById("flexContainer" + count);
    var newDegree = document.getElementById("newDegree" + count);
    var mainContainer = document.getElementById("newAssessmentContainer1");
    var newDegreeContainer = document.getElementById(
      "newDegreeContainer" + count
    );
    if (
      degreeSelecttag &&
      degreeOptiontag &&
      degreeSpantag &&
      degreeFlextContainer &&
      newDegree &&
      newDegreeContainer
    ) {
      degreeSelecttag.remove();
      degreeOptiontag.remove();
      degreeSpantag.remove();
      degreeFlextContainer.remove();
      newDegree.remove();
      newDegreeContainer.remove();
      mainContainer.remove();
    } else {
      return false;
    }
  }

  function addAnotherDegreesDropdown(count, degrees, addButtons) {
    var newDegreeContainer = document.createElement("div");
    newDegreeContainer.setAttribute("id", "newDegreeContainer" + count);

    var label = document.createElement("label");
    label.setAttribute("id", "newDegree" + count);
    label.setAttribute("for", "degree");
    var labelCounter = count + 1;
    label.innerHTML = "Add Degree:" + labelCounter;

    var flexContainer = document.createElement("div");
    flexContainer.setAttribute("id", "flexContainer" + count);

    var span = document.createElement("span");
    span.setAttribute("id", "Span" + count);

    var selectTag = document.createElement("select");
    selectTag.setAttribute("id", "degree_select" + count);
    selectTag.setAttribute("name", "degree_select");

    // var createOptionTag = document.createElement("option");
    // createOptionTag.setAttribute("id", "optionTag");
    // var optionTag = document.getElementById("optionTag");
    // var getSelectTag = document.getElementById("degree_select");
    // getSelectTag.appendChild(optionTag);

    // optionTag.innerHTML = "-- select an option --";
    // console.log("optionTag");

    degrees.forEach((degree) => {
      var optionField = document.createElement("option");
      optionField.setAttribute("id", "degree_option" + count);
      optionField.setAttribute("class", "optionNewDegreeClass");

      optionField.innerHTML = degree.Name;
      selectTag.appendChild(optionField);
    });
    flexContainer.appendChild(span);
    flexContainer.appendChild(selectTag);

    if (addButtons) {
      var imageTagPlus = document.createElement("img");
      imageTagPlus.setAttribute("id", "plusSign");
      imageTagPlus.setAttribute("src", "/img/plus-removed-background.png");
      imageTagPlus.setAttribute("width", "35px");
      imageTagPlus.setAttribute("height", "20px");

      var imageTagMinus = document.createElement("img");
      imageTagMinus.setAttribute("id", "minusSign");
      imageTagMinus.setAttribute("src", "/img/minus-removed-background.png");
      imageTagMinus.setAttribute("width", "20px");
      imageTagMinus.setAttribute("height", "20px");
      flexContainer.appendChild(imageTagPlus);
      flexContainer.appendChild(imageTagMinus);
    }

    newDegreeContainer.appendChild(label);
    newDegreeContainer.appendChild(flexContainer);

    var degreesContainer = document.getElementById("degreesContainer");
    degreesContainer.appendChild(newDegreeContainer);
  }

  fetch(
    // "https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-1.json"
    "/json/assessment_data.json"
  )
    .then((response) => response.json())
    .then((response) => {
      weightingResponse = response;
      assessmentData = response;
      addAnotherAssessmentDropdown("", response, true);
      counter = 1;
      var plusSignAssessment = document.getElementById("plusSignAssessment");
      plusSignAssessment.addEventListener("click", function (e) {
        if (counter < 3) {
          addAnotherAssessmentDropdown(counter, assessmentData, false);
          counter++;
          console.log(counter);
        }
        e.preventDefault();
      });
      console.log(counter);

      var minusSignAssessment = document.getElementById("minusSignAssessment");
      minusSignAssessment.addEventListener("click", function (e) {
        console.log(counter);
        if (counter > 1) {
          counter--;
          removeInputBoxAssessment(counter);
        }
      });
    });

  function removeInputBoxAssessment(counter) {
    console.log(counter);
    var assessmentSelecttag = document.getElementById(
      "assessment_select" + counter
    );
    console.log(assessmentSelecttag);
    var assessmentOptiontag = document.getElementById(
      "assessment_option" + counter
    );

    var assessmentSpantag = document.getElementById("SpanAssessment" + counter);
    var assessmentFlextContainer = document.getElementById(
      "flexContainerAssessment" + counter
    );
    var newAssessment = document.getElementById("newAssessment" + counter);

    if (
      assessmentOptiontag &&
      assessmentSelecttag &&
      assessmentSpantag &&
      assessmentFlextContainer &&
      newAssessment
    ) {
      assessmentOptiontag.remove();
      assessmentSelecttag.remove();
      assessmentSpantag.remove();
      assessmentFlextContainer.remove();
      newAssessment.remove();
    } else {
      return false;
    }
  }

  function addAnotherAssessmentDropdown(counter, assessments, addButtons) {
    var newAssessmentContainer = document.createElement("div");
    newAssessmentContainer.setAttribute(
      "id",
      "newAssessmentContainer" + counter
    );

    var label = document.createElement("label");
    label.setAttribute("id", "newAssessment" + counter);
    label.setAttribute("for", "Assessment");
    var labelCounter = counter + 1;
    label.innerHTML = "Add Assessment:" + labelCounter;

    var flexContainerAssessment = document.createElement("div");
    flexContainerAssessment.setAttribute(
      "id",
      "flexContainerAssessment" + counter
    );

    var spanAssessment = document.createElement("span");
    spanAssessment.setAttribute("id", "SpanAssessment" + counter);

    var selectTagAssessment = document.createElement("select");
    selectTagAssessment.setAttribute("id", "assessment_select" + counter);
    selectTagAssessment.setAttribute("name", "assessment_select");

    assessments.forEach((assessment) => {
      var optionFieldAssessment = document.createElement("option");
      optionFieldAssessment.setAttribute("id", "assessment_option" + counter);
      optionFieldAssessment.setAttribute("class", "optionNewAssessmentClass");

      optionFieldAssessment.innerHTML =
        assessment.Title + " " + assessment.Weighting + "%";

      selectTagAssessment.appendChild(optionFieldAssessment);
    });
    flexContainerAssessment.appendChild(spanAssessment);
    flexContainerAssessment.appendChild(selectTagAssessment);

    if (addButtons) {
      var imageTagPlusAssessment = document.createElement("img");
      imageTagPlusAssessment.setAttribute("id", "plusSignAssessment");
      imageTagPlusAssessment.setAttribute(
        "src",
        "/img/plus-removed-background.png"
      );
      imageTagPlusAssessment.setAttribute("width", "35px");
      imageTagPlusAssessment.setAttribute("height", "20px");

      var imageTagMinusAssessment = document.createElement("img");
      imageTagMinusAssessment.setAttribute("id", "minusSignAssessment");
      imageTagMinusAssessment.setAttribute(
        "src",
        "/img/minus-removed-background.png"
      );
      imageTagMinusAssessment.setAttribute("width", "20px");
      imageTagMinusAssessment.setAttribute("height", "20px");
      flexContainerAssessment.appendChild(imageTagPlusAssessment);
      flexContainerAssessment.appendChild(imageTagMinusAssessment);
    }

    newAssessmentContainer.appendChild(label);
    newAssessmentContainer.appendChild(flexContainerAssessment);

    var assessmentContainer = document.getElementById("assessmentContainer");
    assessmentContainer.appendChild(newAssessmentContainer);
  }
});
