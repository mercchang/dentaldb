import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  apiUrl = "https://localhost:44365/api/Doctor/"
  constructor(private httpClient: HttpClient) { }

  getDoctors(){
    return this.httpClient.get<Doctor[]>(this.apiUrl);
  }

  getDoctor(id:number){
    return this.httpClient.get<Doctor>(this.apiUrl + id);
  }

  createDoctor(doc:Doctor){
    return this.httpClient.post<Doctor>(this.apiUrl, doc);
  }

  editDoctor(id:number, editedDoctor:Doctor){
    return this.httpClient.put<Doctor>(this.apiUrl + id, editedDoctor);
  }

  deleteDoctor(id:number){
    return this.httpClient.delete<Doctor>(this.apiUrl + id);
  }

  getPatients(id:number){
    return this.httpClient.get<Patient[]>(this.apiUrl + id);
  }
}
