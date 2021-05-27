import { Case } from "./case.model";
import { Doctor } from "./doctor.model";

export class Patient{
    PatientId: number;
    DoctorId: number;
    CaseId: number;
    FirstName: string;
    LastName: string;
    Phone: string;
    Address: string;

    Case: Case;
    Doctor: Doctor;

    constructor(CaseId, FirstName, LastName, Phone, Address){
        this.CaseId = CaseId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Phone = Phone;
        this.Address = Address;
    }
}