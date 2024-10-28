import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  servicioEvento: any;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    // Obtén la fecha desde el formulario
    const fechaString = this.eventoForm.value.fechaEvento;
  
    // Convierte la cadena a un objeto Date
    const fecha = new Date(fechaString);
  
    // Comprueba si la fecha es válida
    if (isNaN(fecha.getTime())) {
      console.error("La fecha no es válida:", fechaString);
      return; // Sal del método si la fecha no es válida
    }
  
    // Formatea la fecha a 'YYYY-MM-DD'
    const fechaFormateada = this.formatearFecha(fecha);
  
    const eventoActualizado = new Evento(
      this.eventoId,
      this.eventoForm.value.nombre,
      this.eventoForm.value.descripcion,
      this.eventoForm.value.genero,
      fechaFormateada, // Usa la fecha formateada sin hora
      this.eventoForm.value.precioMin,
      this.eventoForm.value.precioMax,
      this.eventoForm.value.localidad,
      this.eventoForm.value.recinto
    );
  
    console.log('Evento actualizado:', eventoActualizado);
  
    this.eventoService.updateEvento(eventoActualizado).subscribe(
      (response: Evento) => {
        console.log("Evento actualizado con éxito", response);
        this.router.navigate(['/']);
      },
     
    );
  }
  
  // Función para formatear la fecha a 'YYYY-MM-DD'
  formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
    const dia = fecha.getDate().toString().padStart(2, '0');
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
  
    return `${dia}-${mes}-${anio} ${horas}:${minutos}`;  // Retorna en formato 'YYYY-MM-DD'
  }
  
}