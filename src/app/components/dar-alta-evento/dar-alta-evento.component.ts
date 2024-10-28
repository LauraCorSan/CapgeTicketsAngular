import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventoServiceService } from '../../service/evento-service.service';
 
@Component({
  selector: 'app-dar-alta-evento',
  templateUrl: './dar-alta-evento.component.html',
  styleUrls: ['./dar-alta-evento.component.scss']
})
export class DarAltaEventoComponent implements OnInit {
  eventoForm: FormGroup; 
  minFecha!: string; 
 
  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private router: Router,
    private snackBar: MatSnackBar
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
        validators: this.precioValidator 
      }
    );
  }
 
  ngOnInit(): void {const today = new Date();
    const anio = today.getFullYear();
    const mes = (today.getMonth() + 1).toString().padStart(2, '0');
    const dia = today.getDate().toString().padStart(2, '0');
    this.minFecha = `${anio}-${mes}-${dia}`;}
 
  precioValidator(form: AbstractControl): ValidationErrors | null {
    const precioMin = form.get('precioMin')?.value;
    const precioMax = form.get('precioMax')?.value;
 
    if (precioMin != null && precioMax != null && precioMax <= precioMin) {
      return { precioInvalido: true };
    }
    return null; 
  }
 
  verificarPrecioMax(): void {
    if (this.eventoForm.hasError('precioInvalido')) {
      //alert('¡No puedes tener la entrada más barata más cara que la más cara! ¡TRAMPOSO!');
    }
  }
 
  onSubmit(): void {
    if (this.eventoForm.valid) {
      const nuevoEvento = { ...this.eventoForm.value }; 
 
      const fechaEvento = nuevoEvento.fechaEvento; 
 
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
          this.showSnackBar('Evento creado con éxito.');
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
      return 'El precio maximo no puede ser menor que el minimo';
    }
    return '';
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }
 
  volver(): void {
    this.router.navigate(['/listarEventos']);
  }
} 