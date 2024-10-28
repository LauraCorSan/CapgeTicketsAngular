
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoServiceService } from '../../service/evento-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evento } from '../../model/evento';

@Component({
  selector: 'app-modificar-evento',
  templateUrl: './modificar-evento.component.html',
  styleUrls: ['./modificar-evento.component.scss']
})
export class ModificarEventoComponent implements OnInit {
  eventoForm!: FormGroup;
  eventoId!: number;
  minFecha!: string;  // Define minFecha para la restricción de fecha
  servicioEvento: any;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private route: ActivatedRoute,
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Configurar el valor mínimo para el campo de fecha
    const today = new Date();
    const anio = today.getFullYear();
    const mes = (today.getMonth() + 1).toString().padStart(2, '0');
    const dia = today.getDate().toString().padStart(2, '0');
    this.minFecha = `${anio}-${mes}-${dia}`; // Define minFecha en formato YYYY-MM-DD

    this.eventoId = +this.route.snapshot.paramMap.get('id')!;
    this.inicializarFormulario();

    // Cargar los datos del evento
    this.eventoService.getEvento(this.eventoId).subscribe((evento) => {
      console.log('Evento cargado:', evento);

      if (evento) {
        let fechaFormateada: string;

        // Suponiendo que evento.fechaEvento viene como string en el formato 'DD-MM-YYYY HH:mm'
        if (typeof evento.fechaEvento === 'string') {
          const [fecha, hora] = evento.fechaEvento.split(' '); // separa la fecha de la hora
          const [dia, mes, anio] = fecha.split('-'); // separa el día, mes y año
          fechaFormateada = `${anio}-${mes}-${dia}`; // convierte a 'YYYY-MM-DD'
        
        } else {
          // Manejar el caso donde la fecha no sea válida
          console.error('La fecha del evento no es válida:', evento.fechaEvento);
          return;
        }

        // Asigna la fecha formateada y el resto de los datos al formulario
        this.eventoForm.patchValue({
          ...evento,
          fechaEvento: fechaFormateada // Aquí asignas la fecha en el formato correcto
        });
      }
    });
  }

  inicializarFormulario(): void {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      genero: [''],
      fechaEvento: ['', Validators.required],
      precioMin: ['', Validators.required],
      precioMax: ['', Validators.required],
      localidad: [''],
      recinto: ['']
    });
  }

  onSubmit() {
    const fechaString = this.eventoForm.value.fechaEvento;
  
    const fecha = new Date(fechaString);
    
    if (isNaN(fecha.getTime())) {
      console.error("La fecha no es válida:", fechaString);
      return; 
    }
  
    // Formatea la fecha a 'YYYY-MM-DD'
    const fechaFormateada = this.formatearFecha(fecha);
  
    const eventoActualizado = new Evento(
      this.eventoId,
      this.eventoForm.value.nombre,
      this.eventoForm.value.descripcion,
      this.eventoForm.value.genero,
      fechaFormateada, 
      this.eventoForm.value.precioMin,
      this.eventoForm.value.precioMax,
      this.eventoForm.value.localidad,
      this.eventoForm.value.recinto
    );
  
    console.log('Evento actualizado:', eventoActualizado);
  
    this.eventoService.updateEvento(eventoActualizado).subscribe(
      (response: Evento) => {
        this.showSnackBar('Evento modificado con éxito.');
        console.log("Evento actualizado con éxito", response);
        this.router.navigate(['/']);
      },
    );
  }
  
  // Función para formatear la fecha a 'YYYY-MM-DD'
  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = fecha.getDate().toString().padStart(2, '0');
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
    return `${dia}-${mes}-${anio} ${horas}:${minutos}`; 
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
