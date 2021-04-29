import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tooth } from '../models/tooth.model';

@Injectable({
  providedIn: 'root'
})
export class ToothService {
  apiUrl = "https://localhost:44365/api/Tooth/"
  constructor(private httpClient: HttpClient) { }

  getTeeth(){
    return this.httpClient.get<Tooth[]>(this.apiUrl);
  }

  getTooth(id:number){
    return this.httpClient.get<Tooth>(this.apiUrl + id);
  }

  createTooth(t:Tooth){
    return this.httpClient.post<Tooth>(this.apiUrl, t);
  }

  editTooth(id:number, editedTooth:Tooth){
    return this.httpClient.put<Tooth>(this.apiUrl + id, editedTooth);
  }

  deleteTooth(id:number){
    return this.httpClient.delete<Tooth>(this.apiUrl + id);
  }
}
