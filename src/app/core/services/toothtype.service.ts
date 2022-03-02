import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ToothType } from '../models/tooth-type.model';

@Injectable({
  providedIn: 'root'
})
export class ToothtypeService {
  //apiUrl = "https://localhost:44365/api/ToothType/"
  apiUrl = environment.firebaseConfig.databaseURL + "/ToothType/"
  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) { }

  getTypes(){
    //return this.httpClient.get<ToothType[]>(this.apiUrl);
    return this.angularFirestore.collection('ToothTypes').snapshotChanges();
  }

  getToothType(id:number){
    return this.httpClient.get<ToothType>(this.apiUrl + id);
  }

  createToothType(t:ToothType){
    return this.httpClient.post<ToothType>(this.apiUrl, t);
  }

  editToothType(id:number, editedToothType:ToothType){
    return this.httpClient.put<ToothType>(this.apiUrl + id, editedToothType);
  }

  deleteToothType(id:number){
    return this.httpClient.delete<ToothType>(this.apiUrl + id);
  }
}
