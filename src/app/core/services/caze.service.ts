import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Caze } from '../models/caze.model';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CazeService {
  //apiUrl = "https://localhost:44365/api/Caze/"
  apiUrl = environment.firebaseConfig.databaseURL + "/Caze/"
  constructor(private httpClient: HttpClient, private angularFirestore: AngularFirestore) { }

  getCazes(){
    return this.angularFirestore.collection('Cazes').snapshotChanges();
    //return this.httpClient.get<Caze[]>(this.apiUrl);
  }

  getCaze(id:number){
    return this.angularFirestore.collection("Cazes").doc(id.toString()).valueChanges();
    //return this.httpClient.get<Caze>(this.apiUrl + id);
  }

  createCaze(c:Caze){
    return this.httpClient.post<Caze>(this.apiUrl, c);
  }

  editCaze(id:number, editedCaze:Caze){
    return this.httpClient.put<Caze>(this.apiUrl + id, editedCaze);
  }

  deleteCaze(id:number){
    return this.httpClient.delete<Caze>(this.apiUrl + id);
  }
}
