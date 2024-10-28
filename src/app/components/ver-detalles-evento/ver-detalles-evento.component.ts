import { Component } from '@angular/core';
import { Evento } from '../../model/evento';
import { EventoServiceService } from '../../evento-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-detalles-evento',
  templateUrl: './ver-detalles-evento.component.html',
  styleUrl: './ver-detalles-evento.component.scss'
})
export class VerDetallesEventoComponent {
  eventoDetalles!: Evento ; 
  constructor(
    private eventoService: EventoServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtiene el ID del evento desde la URL
    this.obtenerDetallesEvento(id); // Llama al método para obtener los detalles
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
