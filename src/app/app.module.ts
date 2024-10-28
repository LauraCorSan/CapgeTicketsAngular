import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModificarEventoComponent } from './components/modificar-evento/modificar-evento.component';
import { DarAltaEventoComponent } from './components/dar-alta-evento/dar-alta-evento.component';
import { VerDetallesEventoComponent } from './components/ver-detalles-evento/ver-detalles-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventoServiceService } from './service/evento-service.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ListarEventosComponent,
    DeleteDialogComponent,
    DarAltaEventoComponent,
    VerDetallesEventoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync(), HttpClient, EventoServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
