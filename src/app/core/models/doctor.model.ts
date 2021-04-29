import { Case } from "./case.model";
import { Patient } from "./patient.model";

export class Doctor{
    doctorId: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;

    patients: Patient[];
    cases: Case[];
}