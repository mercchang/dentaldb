import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private angularFirestore: AngularFirestore) { }

  getDoctors(){
    return this.angularFirestore.collection('Doctors').snapshotChanges();
  }

  getDoctor(id){
    return this.angularFirestore.collection("Doctors").doc(id).valueChanges();
  }

  createDoctor(doc:Doctor){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection("Doctors").add(doc).then(response => {
        console.log(response)
      }, error => reject(error));
    });
  }

  editDoctor(doc:Doctor, id:string){
    return this.angularFirestore.collection("Doctors").doc(id).update({
      FirstName: doc.FirstName,
      LastName: doc.LastName,
      Address: doc.Address,
      Phone: doc.Phone
    })
  }

  deleteDoctor(doc:Doctor){
    return this.angularFirestore.collection("Doctors").doc(doc.id).delete();
  }
}
