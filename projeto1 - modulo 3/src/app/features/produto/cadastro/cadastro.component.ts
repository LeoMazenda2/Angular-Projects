import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  id!: string;
  produto!: Produto
  rota: string ='';
  isNovoProduto: boolean = false;

  //template driven (depressiado)
  nome: string = '';
  descricao: string = '';
  preco: string = '';
  estoque: number = 0;
  tituloPagina: string ='';

  constructor(private produtoService: ProdutoService, 
    private activatedeRoute: ActivatedRoute,
    private router: Router) {

     }

  ngOnInit(): void {
   // Recuperar o Producto pelo ID
   this.rota = this.activatedeRoute.snapshot.url[0].path;

    if(this.rota === 'editar-produto') {
      this.id = this.activatedeRoute.snapshot.url[1].path;
   
      this.produtoService.getprodutoPeloId(this.id).subscribe((produto: Produto) => {
        //template driven (depressiado)
         this.produto = produto;
         this.nome = produto.nome;
         this.descricao = produto.descricao;
         this.preco = produto.preco;
         this.estoque = produto.estoque;  
         this.tituloPagina = `A editar producto`    
      });
    } else {
      this.isNovoProduto = true;
      this.tituloPagina = 'A adiconar Producto'
    }


  }

  salvarProduto(){
    const produtoParaSalavar: Produto = {
      id: parseInt(this.id),
      nome: this.nome,
      preco: this.preco,    
      descricao: this.descricao,
      estoque: this.estoque
    }

    console.log(produtoParaSalavar);

    if(this.isNovoProduto){
      this.adiconarProduto(produtoParaSalavar);
    } else{
      produtoParaSalavar.imagemUrl = this.produto.imagemUrl;
      this.atualizarProduto(produtoParaSalavar);
    }    
  }

  atualizarProduto(produtoParaSalavar: Produto){
    this.produtoService.actualizarProduto(produtoParaSalavar).subscribe(Response =>{
      this.router.navigate(["produto","listagem"]);
    });
  }

  adiconarProduto(produtoParaSalavar: Produto){
    this.produtoService.aicionarProduto(produtoParaSalavar).subscribe(Response =>{
      this.router.navigate(["produto","listagem"]);
    });
  }
}
