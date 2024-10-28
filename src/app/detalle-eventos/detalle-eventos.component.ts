import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoServiceService } from '../service/evento-service.service'; // Ruta del servicio
import { Evento } from '../model/evento'; // Ruta del modelo

@Component({
  selector: 'app-detalle-eventos',
  templateUrl: './detalle-eventos.component.html',
  styleUrls: ['./detalle-eventos.component.scss'] // Cambia `styleUrl` a `styleUrls`
})
export class DetalleEventosComponent implements OnInit {
  eventoDetalles: Evento | null = null; // Variable para almacenar los detalles

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
