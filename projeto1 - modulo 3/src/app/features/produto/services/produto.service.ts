import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto, Produtos } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  // Injeção de dependencias

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    
   }

   //recuperar a lista de produtos
   getProductos(): Observable<Produtos>{
      return this.http.get<Produtos>(`${this.baseUrl}produtos`);
   }

   getprodutoPeloId(id: string): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}produtos/${id}`);
}
}
