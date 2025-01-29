import { Ui, GradesAndGPAcalc } from "./funcOop.js";
const calculator = new GradesAndGPAcalc(`GradesAndCreditsDiv`);
Ui.preventFormSubmission();
Ui.CreateMainElements();
Ui.AddAndDeleteSubject();
Ui.handleUi(calculator);
Ui.RestButton();
Ui.UpdateCopyright();
