import { Case } from "./case.model";
import { ToothType } from "./tooth-type.model";

export class Tooth{
    ToothId: number;
    CaseId: number;
    ToothTypeId: number;
    ToothNumber: number;
    Shade: string;

    Case: Case;
    ToothType: ToothType;

    constructor(ToothTypeId, ToothNumber, Shade){
        this.ToothTypeId = ToothTypeId;
        this.ToothNumber = ToothNumber;
        this.Shade = Shade;
    }
}