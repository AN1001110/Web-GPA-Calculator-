

function GetGradsAndCredits() {
    const ChildrenCount =
      document.getElementById(`GradesAndCreditsDiv`).children.length;
    const GradesAndCreditsList = [];
    let Grades = document.querySelectorAll(`.grades`);
    let Credits = document.querySelectorAll(`.credits`);
    for (let i = 0; i < ChildrenCount; i++) {
      if (!isNaN(Grades[i].value) && !isNaN(Credits[i].value)) {
        GradesAndCreditsList.push([parseFloat(Grades[i].value),parseFloat(Credits[i].value)]);
      } else {
        GradesAndCreditsList.length = 0;
        break;
      }
    }
    return GradesAndCreditsList;
  }
  function computePercentage(GradesAndCreditsList) {
    if (GradesAndCreditsList.length > 0) {
      let totalPoints = 0;
      let totalCredits = 0;
      for (const [grade, credit] of GradesAndCreditsList) {
        totalPoints += grade * credit;
        totalCredits += credit;
      }
      return totalCredits > 0 ? totalPoints / totalCredits : 0;
    }
  }
  function ComputeGradeAndGpa(percentage) {
    let grade;
    if (percentage > 100 || percentage < 0) {
      grade = "wrong";
    } else if (percentage >= 95) {
      grade = "A+";
    } else if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 85) {
      grade = "A-";
    } else if (percentage >= 80) {
      grade = "B+";
    } else if (percentage >= 75) {
      grade = "B";
    } else if (percentage >= 70) {
      grade = "C+";
    } else if (percentage >= 65) {
      grade = "C";
    } else if (percentage >= 60) {
      grade = "D+";
    } else if (percentage >= 55) {
      grade = "D";
    } else if (percentage >= 50) {
      grade = "D-";
    } else {
      grade = "F";
    }
    let gpa = (percentage * 4) / 100;
    return [gpa, grade];
  }
  
   function copyright() {
    let footer = document.querySelector(`footer .copyright`);
    let date = new Date();
    footer.innerHTML = `©${date.getFullYear()}`;
  }
 