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
  getProductos(): Observable<Produtos> {
    return this.http.get<Produtos>(`${this.baseUrl}produtos`);
  }

  getprodutoPeloId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}produtos/${id}`);
  }

  actualizarProduto(produto: Produto): Observable<any> {
    return this.http.put(`${this.baseUrl}produtos/${produto.id}`, produto);
  }
  aicionarProduto(produto: Produto): Observable<any> {
    return this.http.post(`${this.baseUrl}produtos`, produto);
  }

  excluirProduto(id: string): Observable<any> {
    return this.http.delete<Produto>(`${this.baseUrl}produtos/${id}`);
  }
}
