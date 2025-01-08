class GradesAndGPAcalc {
  constructor(GradesAndCreditsDivID) {
    this.GradesAndCreditsDivID = GradesAndCreditsDivID;
    this.GradesAndCreditsList = [];
    this.Percentage = 0;
    this.GPA = 0;
    this.Grade = "F";
    this.state = false;
  }

  GetGradsAndCredits() {
    const GradesAndCreditsArray = [];
    const ChildrenCount = document.getElementById(
      `${this.GradesAndCreditsDivID}`
    ).children.length;

    let Grades = document.querySelectorAll(`.grades`);
    let Credits = document.querySelectorAll(`.credits`);
    for (let i = 0; i < ChildrenCount; i++) {
      if (
        Grades[i].value != "" &&
        Grades[i].value >= 0 &&
        Grades[i].value <= 100 &&
        Credits[i].value != "" &&
        Credits[i].value >= 0 &&
        Credits[i].value <= 10
      ) {
        !this.state ? (this.state = true) : "";
        GradesAndCreditsArray.push([
          parseFloat(Grades[i].value),
          parseFloat(Credits[i].value),
        ]);
      } else {
        GradesAndCreditsArray.length = 0;
        this.state = false;
        break;
      }
    }
    this.GradesAndCreditsList = GradesAndCreditsArray;
  }
  computePercentageAndGPA() {
    if (this.GradesAndCreditsList.length > 0) {
      let totalPoints = 0;
      let totalGPA = 0;
      let totalCredits = 0;
      for (const [grade, credit] of this.GradesAndCreditsList) {
        totalPoints += grade * credit;
        totalCredits += credit;
        if (grade > 100 || grade < 0) {
          totalGPA = "wrong";
        } else if (grade >= 95) {
          totalGPA += 4 * credit;
        } else if (grade >= 90) {
          totalGPA += 3.7 * credit;
        } else if (grade >= 85) {
          totalGPA += 3.4 * credit;
        } else if (grade >= 80) {
          totalGPA += 3 * credit;
        } else if (grade >= 75) {
          totalGPA += 2.7 * credit;
        } else if (grade >= 70) {
          totalGPA += 2.3 * credit;
        } else if (grade >= 65) {
          totalGPA += 2 * credit;
        } else if (grade >= 60) {
          totalGPA += 1.7 * credit;
        } else if (grade >= 55) {
          totalGPA += 1.3 * credit;
        } else if (grade >= 50) {
          totalGPA += 1 * credit;
        }
      }
      this.Percentage =
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
      this.GPA = totalCredits > 0 ? (totalGPA / totalCredits).toFixed(2) : 0;
    }
  }

  ComputeGradeAndGpa() {
    if (this.GPA > 4 || this.GPA < 0) {
      this.Grade = "wrong";
    } else if (this.GPA == 4) {
      this.Grade = "A+";
    } else if (this.GPA >= 3.7) {
      this.Grade = "A";
    } else if (this.GPA >= 3.4) {
      this.Grade = "A-";
    } else if (this.GPA >= 3) {
      this.Grade = "B+";
    } else if (this.GPA >= 2.7) {
      this.Grade = "B";
    } else if (this.GPA >= 2.3) {
      this.Grade = "C+";
    } else if (this.GPA >= 2) {
      this.Grade = "C";
    } else if (this.GPA >= 1.7) {
      this.Grade = "D+";
    } else if (this.GPA >= 1.3) {
      this.Grade = "D";
    } else if (this.GPA >= 1) {
      this.Grade = "D-";
    } else if (this.GPA <= 0) {
      this.Grade = "F";
    }
  }
}
class Ui {
  static createElement() {
    let ChildrenCount = GradesAndCreditsDiv.children.length;
    let element = document.createElement("div");
    element.className = `filed`;
    element.id = `sub${ChildrenCount + 1}`;
    element.innerHTML = `
        <div  class="">
        <input class=" flex"  type="text" name="SubName${
          ChildrenCount + 1
        }" placeholder="Subject ${ChildrenCount + 1}" />
        </div>
        
        <div  class="full-width">
        <input
        class="two-width grades  flex"
        type="number"
        name="Grade${ChildrenCount + 1}"
        min="0"
                max="100"
                required
                placeholder=" Grade ${ChildrenCount + 1}"
                
              />

              <input
                class="two-width credits  "
                type="number"
                name="credit${ChildrenCount + 1}"
                min="0"
                max="10"
                required
              
                placeholder="Credit ${ChildrenCount + 1}"/>
                </div>
                `;
    GradesAndCreditsDiv.appendChild(element);
  }

  static handleUi(calc) {
    function ShowResults() {
      if (calc.state) {
        let result = document.getElementById("result");
        result.innerHTML = `<div>Percentage: %${calc.Percentage}</div>
        <div>Grade: ${calc.Grade}</div>
        <div>GPA: ${calc.GPA}</div>`;
      }
    }
    const calcBtn = document.querySelector(`#calc`);
    calcBtn.onclick = function () {
      calc.GetGradsAndCredits();
      calc.computePercentageAndGPA();
      calc.ComputeGradeAndGpa();
      ShowResults();
    };
  }
  static CreateMainElements() {
    for (let i = 0; i < 7; i++) {
      Ui.createElement();
    }
  }
  static AddAndDeleteSubject() {
    let GradesAndCreditsDiv = document.getElementById("GradesAndCreditsDiv");
    let AddBtn = document.getElementById("add");
    let DeleteBtn = document.getElementById("delete");
    AddBtn.onclick = function () {
      if (GradesAndCreditsDiv.children.length < 20) {
        Ui.createElement();
      }
    };
    DeleteBtn.onclick = function () {
      let ChildrenCount = GradesAndCreditsDiv.children.length;
      let deletedElement = document.getElementById(`sub${ChildrenCount}`);
      ChildrenCount > 0 ? deletedElement.remove() : "";
    };
  }
  static RestButton() {
    const restBtn = document.getElementById(`rest`);
    restBtn.onclick = function () {
      let grades = document.querySelectorAll(`.grades`);
      let credits = document.querySelectorAll(`.credits`);
      for (let i = 0; i < grades.length; i++) {
        grades[i].value = "";
        credits[i].value = "";
      }
      let result = document.getElementById("result");
      result.innerHTML = "";
    };
  }
  static preventFormSubmission() {
    const disabled = document.querySelector(`form`);
    disabled.onsubmit = (element) => element.preventDefault();
  }
  static UpdateCopyright() {
    let footer = document.querySelector(`footer .copyright`);
    let date = new Date();
    footer.innerHTML = `©${date.getFullYear()}`;
  }
}
export { Ui, GradesAndGPAcalc };
