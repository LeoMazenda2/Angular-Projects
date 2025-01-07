import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit{

  constructor(private produtoService: ProdutoService){

  }

  // RXJS
  // Javascript axios axios.get() requisicao assincrona 
  // async return await === Promisse
  // Angular usa RXJS e o RXJS nao usa Promisse
  // Angular usa Observable === Cano 
  ngOnInit(): void {    
    this.produtoService.getCidadePeloCep().subscribe(resposta => {
      console.log(resposta)
    });
  }

  // getDoJavascript(){
  //   this.produtoService.getCidadePeloCep().them( resposta => {
  //     this.cep = resposta
  //   })
  // }

}
