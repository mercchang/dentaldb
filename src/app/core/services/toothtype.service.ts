import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ToothType } from '../models/tooth-type.model';

@Injectable({
  providedIn: 'root'
})
export class ToothtypeService {
  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) { }

  getTypes(){
    return this.angularFirestore.collection('ToothTypes').snapshotChanges();
  }

  getToothType(id){
    return this.angularFirestore.collection("ToothTypes").doc(id).valueChanges();
  }

  createToothType(t:ToothType){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection("ToothTypes").add(t).then(response => {
        console.log(response)
      }, error => reject(error));
    });
  }

  editToothType(editedToothType:ToothType, id:string){
    return this.angularFirestore.collection("ToothTypes").doc(id).update({
      Name: editedToothType.Name,
      Price: editedToothType.Price,
      Description: editedToothType.Description
    })
  }

  deleteToothType(tt:ToothType){
    return this.angularFirestore.collection("ToothTypes").doc(tt.id).delete();
  }
}
