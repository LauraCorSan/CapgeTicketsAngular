import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleEventosComponent } from './detalle-eventos/detalle-eventos.component';

const routes: Routes = [
  { path: 'detalle-evento/:id', component: DetalleEventosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
