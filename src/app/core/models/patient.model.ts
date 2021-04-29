import { Case } from "./case.model";
import { Doctor } from "./doctor.model";

export class Patient{
    patientId: number;
    doctorId: number;
    caseId: number;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;

    case: Case;
    doctor: Doctor;
}