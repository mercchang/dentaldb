import { Case } from "./case.model";
import { ToothType } from "./tooth-type.model";

export class Tooth{
    toothId: number;
    caseId: number;
    toothTypeId: number;
    toothNumber: number;
    shade: string;

    case: Case;
    toothType: ToothType;
}