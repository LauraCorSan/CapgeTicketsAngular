import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors } from '@angular/forms';
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
    this.eventoForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        genero: ['', Validators.required],
        fechaEvento: ['', [Validators.required]],
        precioMin: ['', [Validators.required, Validators.min(0.01)]],
        precioMax: ['', [Validators.required, Validators.min(0.01)]],
        localidad: ['', Validators.required],
        recinto: ['', Validators.required]
      },
      {
        validators: this.precioValidator // Añadimos el validador personalizado al grupo
      }
    );
  }

  ngOnInit(): void {}

  precioValidator(form: AbstractControl): ValidationErrors | null {
    const precioMin = form.get('precioMin')?.value;
    const precioMax = form.get('precioMax')?.value;

    if (precioMin != null && precioMax != null && precioMax <= precioMin) {
      return { precioInvalido: true };
    }
    return null; // Devuelve null si la validación es correcta
  }

  verificarPrecioMax(): void {
    if (this.eventoForm.hasError('precioInvalido')) {
      alert('¡No puedes tener la entrada más barata más cara que la más cara! ¡TRAMPOSO!');
    }
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const nuevoEvento = { ...this.eventoForm.value }; // Crea una copia del objeto del formulario

      // Asegúrate de que el campo de fecha esté en el formato correcto
      const fechaEvento = nuevoEvento.fechaEvento; // Suponiendo que 'fechaEvento' es el nombre del control

      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(fechaEvento)) {
        const date = new Date(fechaEvento);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        nuevoEvento.fechaEvento = `${day}-${month}-${year} ${hours}:${minutes}`;
      } else {
        console.error('Formato de fecha no válido');
        console.log(fechaEvento);
        return;
      }

      this.eventoService.addEvento(nuevoEvento).subscribe({
        next: () => {
          alert('Evento creado exitosamente');
          this.router.navigate(['/listarEventos']);
        }
      });
    }
  }

  isInvalid(campo: string): boolean | undefined {
    const control = this.eventoForm.get(campo);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  isPrecioMaxInvalid(): boolean | undefined {
    return this.eventoForm.hasError('precioInvalido') && this.eventoForm.get('precioMax')?.touched;
  }

  getPrecioErrorMessage(): string {
    if (this.eventoForm.hasError('precioInvalido')) {
      return '¡No puedes meter la entrada más barata más cara que la más cara! ¡ESTAMOS LOCOOOOOOOOOOS!';
    }
    return '';
  }

  volver(): void {
    this.router.navigate(['/listarEventos']);
  }
}