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
         this.tituloPagina = `A editar o producto ${this.nome.toUpperCase()}`    
      });
    } else {
      this.isNovoProduto = true;
      this.tituloPagina = 'Novo Producto'
    }


  }

  salvarProduto(){

    const novoProduto = {
      id: parseInt(this.id),
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      imagemUrl: this.produto.imagemUrl,
      estoque: this.estoque
    }

    console.log(novoProduto);

    this.produtoService.actualizarProduto(novoProduto).subscribe(Response =>{
      alert('Produto actualizado com sucesso');
      this.router.navigate(["produto","listagem"]);
    });
  }
}
