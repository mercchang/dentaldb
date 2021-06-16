import { Caze } from "./caze.model";

export class Doctor{
    DoctorId: number;
    FirstName: string;
    LastName: string;
    Address: string;
    Phone: string;

    Cases: Caze[];

    constructor(FirstName, LastName, Address, Phone){
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Address = Address;
        this.Phone = Phone;
    }
}