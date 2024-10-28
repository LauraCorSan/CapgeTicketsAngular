import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarEventosComponent } from './components/listar-eventos/listar-eventos.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EventoServiceService } from './service/evento-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ListarEventosComponent, DeleteDialogComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,

  ],
  providers: [
    provideAnimationsAsync(), HttpClient, EventoServiceService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
