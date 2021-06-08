import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caze } from '../models/caze.model';

@Injectable({
  providedIn: 'root'
})
export class CazeService {
  apiUrl = "https://localhost:44365/api/Caze/"
  constructor(private httpClient: HttpClient) { }

  getCazes(){
    return this.httpClient.get<Caze[]>(this.apiUrl);
  }

  getCaze(id:number){
    return this.httpClient.get<Caze>(this.apiUrl + id);
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
