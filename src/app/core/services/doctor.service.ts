import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  //apiUrl = "https://localhost:44365/api/Doctor/"
  apiUrl = environment.firebaseConfig.databaseURL + "/Doctor/"
  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) { }

  getDoctors(){
    //return this.httpClient.get<Doctor[]>(this.apiUrl);
    return this.angularFirestore.collection('Doctors').snapshotChanges();
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
}
