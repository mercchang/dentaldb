import { Case } from "./case.model";
import { Patient } from "./patient.model";

export class Doctor{
    DoctorId: number;
    FirstName: string;
    LastName: string;
    Address: string;
    Phone: string;

    Patients: Patient[];
    Cases: Case[];

    constructor(FirstName, LastName, Address, Phone){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Address = Address;
        this.Phone = Phone;
    }
}