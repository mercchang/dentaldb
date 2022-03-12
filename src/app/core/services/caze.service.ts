import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Caze } from '../models/caze.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CazeService {
  //apiUrl = environment.firebaseConfig.databaseURL + "/Caze/"
  constructor(private angularFirestore: AngularFirestore) { }

  getCazes(){
    return this.angularFirestore.collection('Cazes').snapshotChanges();
  }

  getCaze(id){
    return this.angularFirestore.collection("Cazes").doc(id).valueChanges();
  }

  createCaze(c:Caze){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection("Cazes").add(c).then(response => {
        console.log(response)
      }, error => reject(error));
    });
  }

  editCaze(editedCaze:Caze, id:string){
    return this.angularFirestore.collection("Cazes").doc(id).update({
      CazeNum: editedCaze.CazeNum,
      ToothTypeId: editedCaze.ToothTypeId,
      ReceiveDate: editedCaze.ReceiveDate,
      DueDate: editedCaze.DueDate,
      Price: editedCaze.Price,
      Remake: editedCaze.Remake,
      Rush: editedCaze.Rush,
      DoctorName: editedCaze.DoctorName,
      PatientFirstName: editedCaze.PatientFirstName,
      PatientLastName: editedCaze.PatientLastName,
      Tooth: editedCaze.Tooth,
      Shade: editedCaze.Shade,
      TType: editedCaze.TType,
      Status: editedCaze.Status
    })
  }

  deleteCaze(c:Caze){
    return this.angularFirestore.collection("Cazes").doc(c.id).delete();
  }
}
