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
    
    Patient: Patient;
    Teeth: Tooth;

    constructor(DoctorId, ReceiveDate, DueDate, Price, Remake, Rush){
        this.DoctorId = DoctorId;
        this.ReceiveDate = ReceiveDate;
        this.DueDate = DueDate;
        this.Price = Price;
        this.Remake = Remake;
        this.Rush = Rush;
    }
}