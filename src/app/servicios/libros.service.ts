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

  public post(libros: Libros): Observable<any>{
    return this.http.post(this.url,libros,{ responseType: 'text'});
  }

  public put(libros: Libros): Observable<any>{
    return this.http.put(this.url,libros,{ responseType: 'text'});
  }

 
  public delete(libros: Libros): Observable<any>{
    return this.http.delete(`${this.url}/${libros.id}`,{ responseType: 'text'});
  }

}




