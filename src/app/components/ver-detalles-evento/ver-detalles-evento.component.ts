import { Component } from '@angular/core';
import { Evento } from '../../model/evento';
import { ActivatedRoute } from '@angular/router';
import { EventoServiceService } from '../../service/evento-service.service';

@Component({
  selector: 'app-ver-detalles-evento',
  templateUrl: './ver-detalles-evento.component.html',
  styleUrl: './ver-detalles-evento.component.scss',
})
export class VerDetallesEventoComponent {
  eventoDetalles!: Evento;
  constructor(
    private eventoService: EventoServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.obtenerDetallesEvento(id);
  }
  obtenerDetallesEvento(id: number): void {
    this.eventoService.getDetalleEvento(id).subscribe(
      (data: Evento) => {
        this.eventoDetalles = data;
      },
      (error: any) => {
        console.error('Error al obtener detalles del evento', error);
      }
    );
  }
}
