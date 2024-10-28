import { Component, OnInit } from '@angular/core';
import { Evento } from '../../model/evento';
import { EventoServiceService } from '../../evento-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.scss'
})
export class ListarEventosComponent implements OnInit{
  eventos: Evento[] = [];
 
  constructor(private router: Router, private eventoService: EventoServiceService,  private dialog: MatDialog) {}
 
  ngOnInit(): void {
   this.listarEventos();
  }
 
  listarEventos  (){
    this.eventoService.getEventos().subscribe((data) => {
      if(data){
        this.eventos=data;
      }
    });
  }
  deleteEvento(evento: Evento): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventoService.deleteEvento(evento).subscribe(
          (data) => {
            this.eventos = this.eventos.filter((e) => e !== evento);
          },
          error => {
            console.error('Error al eliminar el evento:', error);
          }
        );
      }
    });



    
  }

}
