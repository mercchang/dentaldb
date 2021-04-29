import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export class Case{
    caseId: number;
    doctorId: number;
    createdDate: string;
    receiveDate: string;
    dueDate: string;
    price: string;
    remake: boolean;

    doctor: Doctor;
    patient: Patient;
}