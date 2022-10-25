import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libros } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  
  url: string = "http://localhost:3000/libros";

  constructor(
    private http: HttpClient
  ) { }

  public get():Observable<Libros[]>{
    return this.http.get<Libros[]>(this.url);
  }
}
