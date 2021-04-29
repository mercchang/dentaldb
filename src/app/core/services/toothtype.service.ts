import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToothType } from '../models/tooth-type.model';

@Injectable({
  providedIn: 'root'
})
export class ToothtypeService {
  apiUrl = "https://localhost:44365/api/ToothType/"
  constructor(private httpClient: HttpClient) { }

  getTeeth(){
    return this.httpClient.get<ToothType[]>(this.apiUrl);
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
