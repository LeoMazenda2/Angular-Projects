import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlBase = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  //Recuperar dados
  getClientes(): Observable<any> {   
    return this.http.get(`${this.urlBase}clientes`);
  } 
}
