import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CadastroComponent,
    ListagemComponent,
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule
    ]
})
export class ProdutoModule { }
