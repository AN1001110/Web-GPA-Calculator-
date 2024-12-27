class GradesAndGPAcalc {
  constructor(GradesAndCreditsDivID) {
    this.GradesAndCreditsDivID = GradesAndCreditsDivID;
    this.GradesAndCreditsList = [];
    this.Percentage = 0;
    this.GPA = 0;
    this.Grade = "F";
    this.Counter = 0;
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
        Grades[i].value >= 0 &&
        Grades[i].value <= 100 &&
        Credits[i].value >= 0 &&
        Credits[i].value <= 10
      ) {
        GradesAndCreditsArray.push([
          parseFloat(Grades[i].value),
          parseFloat(Credits[i].value),
        ]);
      } else {
        GradesAndCreditsArray.length = 0;
        break;
      }
    }
    this.GradesAndCreditsList = GradesAndCreditsArray;
  }
  computePercentage() {
    if (this.GradesAndCreditsList.length > 0) {
      let totalPoints = 0;
      let totalCredits = 0;
      for (const [grade, credit] of this.GradesAndCreditsList) {
        totalPoints += grade * credit;
        totalCredits += credit;
      }

      this.Percentage =
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    }
  }
  ComputeGradeAndGpa() {
    if (this.Percentage > 100 || this.Percentage < 0) {
      this.Grade = "wrong";
    } else if (this.Percentage >= 95) {
      this.Grade = "A+";
    } else if (this.Percentage >= 90) {
      this.Grade = "A";
    } else if (this.Percentage >= 85) {
      this.Grade = "A-";
    } else if (this.Percentage >= 80) {
      this.Grade = "B+";
    } else if (this.Percentage >= 75) {
      this.Grade = "B";
    } else if (this.Percentage >= 70) {
      this.Grade = "C+";
    } else if (this.Percentage >= 65) {
      this.Grade = "C";
    } else if (this.Percentage >= 60) {
      this.Grade = "D+";
    } else if (this.Percentage >= 55) {
      this.Grade = "D";
    } else if (this.Percentage >= 50) {
      this.Grade = "D-";
    }
    this.GPA = ((this.Percentage * 4) / 100).toFixed(2);
  }
}
class Ui {
  static createElement() {
    let ChildrenCount = GradesAndCreditsDiv.children.length;
    let element = document.createElement("div");
    element.className = `flex`;
    element.id = `sub${ChildrenCount + 1}`
    element.innerHTML = `
        
        <input class="three-width" type="text" name="SubName${
          ChildrenCount + 1
        }" placeholder="Subject ${ChildrenCount + 1}" />
        <input
        class="three-width grades"
                type="number"
                name="Grade${ChildrenCount + 1}"
                min="0"
                max="100"
                required
                placeholder=" Grade ${ChildrenCount + 1}"
                
              />

              <input
                class="three-width credits"
                type="number"
                name="credit${ChildrenCount + 1}"
                min="0"
                max="10"
                required
              
                placeholder="Credit ${ChildrenCount + 1}"
              />
            
            `;
    GradesAndCreditsDiv.appendChild(element);
  }

  static handleUi(calc) {
    function ShowResults() {
      let result = document.getElementById("result");
      result.innerHTML = `<div>Percentage: ${calc.Percentage}%</div>
      <div>Grade: ${calc.Grade}</div>
      <div>GPA: ${calc.GPA}</div>`;
    }
    const calcBtn = document.querySelector(`.btn`);
    calcBtn.onclick = function () {
      calc.GetGradsAndCredits();
      calc.computePercentage();
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
      if (GradesAndCreditsDiv.children.length <= 20) {
        Ui.createElement();
      }
    };
    DeleteBtn.onclick = function () {
      let ChildrenCount = GradesAndCreditsDiv.children.length;
     let deletedElement = document.getElementById(`sub${ChildrenCount}`)
     GradesAndCreditsDiv.children.length > 0 ? deletedElement.remove() : ""
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
