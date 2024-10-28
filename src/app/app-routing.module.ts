import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { ModificarEventoComponent } from './components/modificar-evento/modificar-evento.component';

const routes: Routes = [
  {
    path: 'listarEventos', component: ListarEventosComponent },
  {
    path: '', redirectTo: "/listarEventos", pathMatch: 'full' },
  {
    path: 'evento/modificar/:id', component: ModificarEventoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
