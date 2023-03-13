import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// IMPORT [interface]
import { Moment } from '../Moments';
import { Response } from '../Response';

// IMPORT [environment]
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {
  // private baseApiUrl= environment.baseApiUrl
  
  private apiUrl:string = `http://localhost:3333/api/moments`

  constructor(private http: HttpClient) {}

  getMoment(): Observable<Response<Moment[]>>{
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }
}
