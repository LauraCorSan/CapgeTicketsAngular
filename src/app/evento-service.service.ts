import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from './model/evento';

@Injectable({
  providedIn: 'root'
})

export class EventoServiceService {
    modificarEvento(eventoActualizado: any) {
      throw new Error('Method not implemented.');
    }

    url = 'http://localhost:8080/evento/';
  
    constructor(private httpClient: HttpClient) {}
  
    public getEventos(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(this.url + 'listarEventos');
    }

    public deleteEvento(evento: Evento) : Observable<any> {
      return this.httpClient.delete<any>(this.url + 'eliminar/' + evento.id);
    }

    public getEvento(id: number): Observable<Evento> {
      return this.httpClient.get<Evento>(`${this.url}${id}`);
    }
  
    public updateEvento(evento: Evento): Observable<Evento> {
      return this.httpClient.put<Evento>(`${this.url}${evento.id}`, evento);
    }

}
