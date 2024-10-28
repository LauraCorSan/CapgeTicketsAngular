import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarEventoComponent } from './components/modificar-evento/modificar-evento.component';
import { DarAltaEventoComponent } from './components/dar-alta-evento/dar-alta-evento.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { VerDetallesEventoComponent } from './components/ver-detalles-evento/ver-detalles-evento.component';

const routes: Routes = [
  { path: 'listarEventos', component: ListarEventosComponent },

  { path: '', redirectTo: '/listarEventos', pathMatch: 'full' },
  { path: 'detalle-evento/:id', component: VerDetallesEventoComponent },

  {
    path: 'add',
    component: DarAltaEventoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
