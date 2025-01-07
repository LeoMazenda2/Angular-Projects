import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produtos } from '../models/produto.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit{

  produtos!: Produtos 

  constructor(private produtoService: ProdutoService){

  }

  ngOnInit(): void {    
    this.produtoService.getProductos()
    .subscribe(produtos => {
     this.produtos = produtos;
    //  console.log(this.produtos);
    });
    
    // this.produtos[1].preco = 'R$ 100,00';
  }
}
