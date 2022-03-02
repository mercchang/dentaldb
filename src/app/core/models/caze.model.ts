import { Doctor } from "./doctor.model";

export class Caze{
    id: string;
    CazeNum: number;
    DoctorId: number;
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
    TType: string;
    Status: boolean;

    Doctor: Doctor;

    constructor(id, CazeNum, DoctorId, ReceiveDate, DueDate, Price, Remake, Rush, DoctorName, 
        PatientFirstName, PatientLastName, Tooth, Shade, TType, Status){
            this.id = id;
            this.CazeNum = CazeNum;
            this.DoctorId = DoctorId;
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