import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoServiceService } from '../../service/evento-service.service';

@Component({
  selector: 'app-dar-alta-evento',
  templateUrl: './dar-alta-evento.component.html',
  styleUrls: ['./dar-alta-evento.component.scss']
})
export class DarAltaEventoComponent implements OnInit {
  eventoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private router: Router
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      genero: ['', Validators.required],
      fechaEvento: ['', [Validators.required]],
      precioMin: ['', [Validators.required, Validators.min(0)]],
      precioMax: ['', [Validators.required, Validators.min(0)]],
      localidad: ['', Validators.required],
      recinto: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const nuevoEvento = { ...this.eventoForm.value }; // Crea una copia del objeto del formulario
  
      // Asegúrate de que el campo de fecha esté en el formato correcto
      const fechaEvento = nuevoEvento.fechaEvento; // Suponiendo que 'fechaEvento' es el nombre del control
  
      // Verifica que 'fechaEvento' esté en el formato correcto
      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fechaEvento)) {
        // Convierte el valor a un objeto Date
        const date = new Date(fechaEvento);
        
        // Extrae los componentes necesarios
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
  
        // Formatea la fecha como "dd-mm-aaaa HH:mm"
        nuevoEvento.fechaEvento = `${day}-${month}-${year} ${hours}:${minutes}`;
      } else {
        console.error('Formato de fecha no válido');
        console.log(fechaEvento);
        return; // Manejo de error
      }
  
      this.eventoService.addEvento(nuevoEvento).subscribe({
        next: () => {
          alert('Evento creado exitosamente');
          this.router.navigate(['/listarEventos']);
        },
      });
    }

  }
  
  isInvalid(campo: string): boolean | undefined  {
    const control = this.eventoForm.get(campo);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
