import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export class Case{
    CaseId: number;
    DoctorId: number;
    CreatedDate: string;
    ReceiveDate: string;
    DueDate: string;
    Price: string;
    Remake: boolean;
    Rush: boolean;

    Doctor: Doctor;
    Patient: Patient;

    constructor(DoctorId, CreatedDate, ReceiveDate, DueDate, Price, Remake, Rush){
        this.DoctorId = DoctorId;
        this.CreatedDate = CreatedDate;
        this.ReceiveDate = ReceiveDate;
        this.DueDate = DueDate;
        this.Price = Price;
        this.Remake = Remake;
        this.Rush = Rush;
    }
}