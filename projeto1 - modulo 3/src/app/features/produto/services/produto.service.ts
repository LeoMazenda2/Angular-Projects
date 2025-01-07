import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // Injeção de dependencias

  private baseUrl = 'https://viacep.com.br/ws/01001000/json/';

  constructor(private http: HttpClient) {
    
   }

   getCidadePeloCep() {

    return this.http.get(this.baseUrl);

   }


}
