import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  id!: string;
  produto!: Produto
  rota: string = '';
  isNovoProduto: boolean = false;
  tituloPagina: string = '';

  formCadastroProduto!: FormGroup:

  constructor(private produtoService: ProdutoService,
    private activatedeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    // Recuperar o Producto pelo ID
    this.rota = this.activatedeRoute.snapshot.url[0].path;
    this.criarFormularrio();

    if (this.rota === 'editar-produto') {
      this.id = this.activatedeRoute.snapshot.url[1].path;

      this.produtoService.getprodutoPeloId(this.id).subscribe((produto: Produto) => {
        //template driven (depressiado)
        this.produto = produto;
        this.formCadastroProduto.controls.['nome'].setValue(this.produto.nome);
        this.formCadastroProduto.controls.('descicao').setValue(this.produto.descricao);
        this.formCadastroProduto.controls.('preco').setValue(this.produto.preco);
        this.formCadastroProduto.controls.('estoque').setValue(this.produto.estoque);
        this.tituloPagina = `A editar producto`
      });
    } else {
      this.isNovoProduto = true;
      this.tituloPagina = 'A adiconar Producto';

    }
  }

 criarFormularrio () {
  this.formCadastroProduto = this.formBuilder.group({
    nome: '',
    descicao: '',
    preco: '',
    estoque: 0
  });
 }


  salvarProduto() {
    // const produtoParaSalavar: Produto = {
    //   id: parseInt(this.id),
    // }

    // console.log(produtoParaSalavar);

    // if (this.isNovoProduto) {
    //   this.adiconarProduto(produtoParaSalavar);
    // } else {
    //   produtoParaSalavar.imagemUrl = this.produto.imagemUrl;
    //   this.atualizarProduto(produtoParaSalavar);
    // }
  }

  atualizarProduto(produtoParaSalavar: Produto) {
    this.produtoService.actualizarProduto(produtoParaSalavar).subscribe(Response => {
      this.router.navigate(["produto", "listagem"]);
    });
  }

  adiconarProduto(produtoParaSalavar: Produto) {
    this.produtoService.aicionarProduto(produtoParaSalavar).subscribe(Response => {
      this.router.navigate(["produto", "listagem"]);
    });
  }
}
