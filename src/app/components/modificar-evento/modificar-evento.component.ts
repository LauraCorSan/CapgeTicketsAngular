
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoServiceService } from '../../service/evento-service.service';
import { Evento } from '../../model/evento';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styleUrls: ['./modificar-evento.component.scss'],
})
export class ModificarEventoComponent implements OnInit {
  eventoForm: FormGroup;
  eventoId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      genero: ['', Validators.required],
      fechaEvento: ['', Validators.required],
      precioMin: ['', [Validators.required, Validators.min(0)]],
      precioMax: ['', [Validators.required, Validators.min(0)]],
      localidad: ['', Validators.required],
      recinto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.eventoId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventoService.getEvento(this.eventoId).subscribe(evento => {
      this.eventoForm.patchValue(evento);
    });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const eventoActualizado = { ...this.eventoForm.value, id: this.eventoId };
      this.eventoService.updateEvento(eventoActualizado).subscribe({
        next: () => {
          alert('Evento actualizado exitosamente');
          this.router.navigate(['/listarEventos']);
        },
        error: () => {
          alert('Error al actualizar el evento');
        }
      });
    }
  }
}
