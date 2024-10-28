export class Evento {
  toApiFormat(): any {
    throw new Error('Method not implemented.');
  }
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  fechaEvento: string;
  // O puedes usar Date si prefieres manejar fechas
  precioMin: number;
  precioMax: number;
  localidad: string;
  recinto: string;
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    genero: string,
    fechaEvento: string,
    precioMin: number,
    precioMax: number,
    localidad: string,
    recinto: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.genero = genero;
    this.fechaEvento = fechaEvento;
    this.precioMin = precioMin;
    this.precioMax = precioMax;
    this.localidad = localidad;
    this.recinto = recinto;
  }
}
