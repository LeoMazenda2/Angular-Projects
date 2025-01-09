import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  formCadastroProduto!: FormGroup;

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
        this.formCadastroProduto.controls['nome'].setValue(this.produto.nome);
        this.formCadastroProduto.controls['descicao'].setValue(this.produto.descricao);
        this.formCadastroProduto.controls['estoque'].setValue(this.produto.estoque);
        this.formCadastroProduto.controls['preco'].setValue(this.produto.preco);
        this.tituloPagina = `A editar producto`
      });
    } else {
      this.isNovoProduto = true;
      this.tituloPagina = 'A adiconar Producto';

    }
  }

 criarFormularrio () {
  this.formCadastroProduto = this.formBuilder.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],//validação de email
    preco: ['', Validators.required],
    estoque: [0, Validators.required]
  });
 }


  salvarProduto() {
    const produtoParaSalavar: Produto = {
      id: parseInt(this.id),
      nome: this.formCadastroProduto.controls['nome'].value,
      descricao: this.formCadastroProduto.controls['descricao'].value,
      estoque: this.formCadastroProduto.controls['estoque'].value,
      preco: this.formCadastroProduto.controls['preco'].value,
    }

    console.log(this.formCadastroProduto.value);

    if (this.isNovoProduto) {
      this.adiconarProduto(produtoParaSalavar);
    } else {
      produtoParaSalavar.imagemUrl = this.produto.imagemUrl;
      this.atualizarProduto(produtoParaSalavar);
    }
  }

  
//  salvarProduto() {
//   let produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || '[]');
//   let novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

//   const produtoParaSalavar: Produto = {
//     id: this.isNovoProduto ? novoId : parseInt(this.id),
//     nome: this.formCadastroProduto.value.nome,
//     descricao: this.formCadastroProduto.value.descricao,
//     estoque: this.formCadastroProduto.value.estoque,
//     preco: this.formCadastroProduto.value.preco,
//   };

//   console.log(this.formCadastroProduto.value);

//   if (this.isNovoProduto) {
//     this.adiconarProduto(produtoParaSalavar);
//     produtos.push(produtoParaSalavar);
//     localStorage.setItem('produtos', JSON.stringify(produtos));
//   } else {
//     produtoParaSalavar.imagemUrl = this.produto.imagemUrl;
//     this.atualizarProduto(produtoParaSalavar);
//   }
// }


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
