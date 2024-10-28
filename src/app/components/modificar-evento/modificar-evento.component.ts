import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { EventoServiceService } from '../../evento-service.service';
import { Evento } from '../../model/evento';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styleUrls: ['./modificar-evento.component.scss'] // Asegúrate de que esto esté correctamente escrito
})
export class ModificarEventoComponent implements OnInit {
  eventoForm!: FormGroup;
  eventoId!: number;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      genero: [''],
      fechaEvento: [Validators.required], 
      precioMin: ['', Validators.required],
      precioMax: ['', Validators.required],
      localidad: [''],
      recinto: ['']
    });

    // Cargar los datos del evento
    this.eventoService.getEvento(this.eventoId).subscribe((evento) => {
      console.log('Evento cargado:', evento); // Para depurar

  

      this.eventoForm.patchValue(evento);
    });
  }



  // Método para guardar los cambios
  onSave(): void {
    if (this.eventoForm.valid) {
      const updatedEvento: Evento = {
        id: this.eventoId,
        ...this.eventoForm.value,
      };

      this.eventoService.updateEvento(updatedEvento).subscribe({
        next: () => this.router.navigate(['/eventos']),
        error: (error) => console.error('Error actualizando el evento:', error),
      });
    }
  }
}