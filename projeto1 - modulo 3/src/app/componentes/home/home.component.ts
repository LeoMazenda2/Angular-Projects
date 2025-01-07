import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../services/home.service';


export interface Pessoa {
  nome: string;
  idade: number;
  sexo: string;
  salario: string;
}

export interface Pessoas extends Array<Pessoa> { }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  title = null;

  constructor(private homeService: HomeService) {

  }

  clientes!: Pessoas;
  displayedColumns: string[] = ['nome', 'sexo', 'idade', 'salario'];
  dataSource !: MatTableDataSource<any>;
  ngOnInit() {
    this.homeService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.dataSource = new MatTableDataSource(this.clientes);
    })
  }
}
