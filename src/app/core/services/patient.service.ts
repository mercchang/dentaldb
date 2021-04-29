import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl = "https://localhost:44365/api/Patient/"
  constructor(private httpClient: HttpClient) { }

  getDoctors(){
    return this.httpClient.get<Patient[]>(this.apiUrl);
  }

  getDoctor(id:number){
    return this.httpClient.get<Patient>(this.apiUrl + id);
  }

  createDoctor(p:Patient){
    return this.httpClient.post<Patient>(this.apiUrl, p);
  }

  editDoctor(id:number, editedPatient:Patient){
    return this.httpClient.put<Patient>(this.apiUrl + id, editedPatient);
  }

  deleteDoctor(id:number){
    return this.httpClient.delete<Patient>(this.apiUrl + id);
  }
}
