import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";
import { Tooth } from "./tooth.model";

export class Caze{
    CazeId: number;
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
    PatientAddress: string;
    PatientPhone:string;
    Tooth: number;
    Shade: string;
    TType: string;

    Doctor: Doctor;
    Teeth: Tooth;

    constructor(DoctorId, ReceiveDate, DueDate, Price, Remake, Rush, DoctorName, PatientFirstName, PatientLastName, PatientFullName, 
        PatientAddress, PatientPhone, Tooth, Shade, TType){
            this.DoctorId = DoctorId;
            this.ReceiveDate = ReceiveDate;
            this.DueDate = DueDate;
            this.Price = Price;
            this.Remake = Remake;
            this.Rush = Rush;
            this.DoctorName = DoctorName;
            this.PatientFirstName = PatientFirstName;
            this.PatientLastName = PatientLastName;
            this.PatientFullName = PatientFullName;
            this.PatientAddress = PatientAddress;
            this.PatientPhone = PatientPhone;
            this.Tooth = Tooth;
            this.Shade = Shade;
            this.TType = TType;
    }
}