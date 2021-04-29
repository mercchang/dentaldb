import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from '../models/case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  apiUrl = "https://localhost:44365/api/Case/"
  constructor(private httpClient: HttpClient) { }

  getCases(){
    return this.httpClient.get<Case[]>(this.apiUrl);
  }

  getCase(id:number){
    return this.httpClient.get<Case>(this.apiUrl + id);
  }

  createCase(c:Case){
    return this.httpClient.post<Case>(this.apiUrl, c);
  }

  editCase(id:number, editedCase:Case){
    return this.httpClient.put<Case>(this.apiUrl + id, editedCase);
  }

  deleteCase(id:number){
    return this.httpClient.delete<Case>(this.apiUrl + id);
  }
}
