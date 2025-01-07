import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  id!: string;
  produto!: Produto

  constructor(private produtoService: ProdutoService, 
    private activatedeRoute: ActivatedRoute) { }

  ngOnInit(): void {
   // Recuperar o Producto pelo ID
   this.id = this.activatedeRoute.snapshot.url[1].path;

   this.produtoService.getprodutoPeloId(this.id).subscribe((produto: Produto) => {
      this.produto = produto;
      console.log(this.produto);
   });
  }
}
