import { Component, OnInit } from '@angular/core';
import { Evento } from '../../model/evento';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MessageDeleted } from '../../model/message-deleted';
import { EventoServiceService } from '../../service/evento-service.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.scss'],
})
export class ListarEventosComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(
    private router: Router,
    private eventoService: EventoServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarEventos();
  }

  listarEventos(): void {
    this.eventoService.getEventos().subscribe((data) => {
      if (data) {
        this.eventos = data;
      }
    });
  }

  deleteEvento(evento: Evento): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);


    dialogRef.afterClosed().subscribe((message: MessageDeleted) => {
      if (message) {
        this.eventoService.deleteEvento(evento).subscribe(
          () => {
            this.showSnackBar('Evento eliminado con éxito.');
            this.listarEventos();
          },
          (error) => {
            if (error.status === 500) {
              this.showSnackBar('No se puede borrar el evento porque tiene compras asociadas.');
            } else {
              console.error('Error al eliminar el evento:', error);
            }
          }
        );
      }
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }
}
