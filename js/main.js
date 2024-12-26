// import {GetGradsAndCredits,computePercentage,ComputeGradeAndGpa,copyright} from "./functions.js"
// const calcBtn = document.querySelector(`.btn`);
// const disabled = document.querySelector(`form`);
// disabled.onsubmit = function (element) {
//   element.preventDefault();
// };
// calcBtn.onclick = function () {
//   let gradesAndCredits = GetGradsAndCredits();
//   let percentage = computePercentage(gradesAndCredits);
//   let GPA, Grade;
//   [GPA, Grade] = ComputeGradeAndGpa(percentage);
//   console.log(gradesAndCredits);
//   console.log(percentage);
//   console.log(GPA);
//   console.log(Grade);
// };
// copyright();
import {Ui,GradesAndGPAcalc} from "./funcOop.js"
const calculator = new GradesAndGPAcalc(`GradesAndCreditsDiv`)
Ui.preventFormSubmission()
Ui.CreateMainElements()
Ui.AddAndDeleteSubject()
Ui.handleUi(calculator)
Ui.RestButton()
Ui.UpdateCopyright()


