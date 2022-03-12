import { Doctor } from "./doctor.model";

export class Caze{
    id: string;
    CazeNum: number;
    DoctorId: number;
    ToothTypeId: number;
    CreatedDate: Date;
    ReceiveDate: Date;
    DueDate: Date;
    Price: string;
    Remake: boolean;
    Rush: boolean;
    DoctorName: string;
    PatientFirstName: string;
    PatientLastName: string;
    PatientFullName: string;
    Tooth: number;
    Shade: string;
    TType: number;
    Status: string;

    Doctor: Doctor;

    constructor(CazeNum, ToothTypeId, ReceiveDate, DueDate, Price, Remake, Rush, DoctorName, 
        PatientFirstName, PatientLastName, Tooth, Shade, TType, Status){
            this.CazeNum = CazeNum;
            this.ToothTypeId = ToothTypeId;
            this.ReceiveDate = ReceiveDate;
            this.DueDate = DueDate;
            this.Price = Price;
            this.Remake = Remake;
            this.Rush = Rush;
            this.DoctorName = DoctorName;
            this.PatientFirstName = PatientFirstName;
            this.PatientLastName = PatientLastName;
            this.Tooth = Tooth;
            this.Shade = Shade;
            this.TType = TType;
            this.Status = Status;
    }
}