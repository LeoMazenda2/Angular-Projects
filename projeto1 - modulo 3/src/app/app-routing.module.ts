import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NovoComponent } from './componentes/novo/novo.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'novo', component: NovoComponent},
  // Lazy Loading
  { path: 'produto', 
  loadChildren: () => import('./features/produto/produto.module').then(m => m.ProdutoModule)} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
