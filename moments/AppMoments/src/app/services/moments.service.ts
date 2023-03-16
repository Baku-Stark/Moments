import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// IMPORT [interface]
import { Moment } from '../Moments';
import { Response } from '../Response';

// IMPORT [environment]
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {
  // private baseApiUrl= environment.baseApiUrl
  
  private apiUrl:string = `http://localhost:3333/api/moments`

  constructor(
      private http: HttpClient
    ){}

  getMoment(): Observable<Response<Moment[]>>{
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMomentID(id:number): Observable<Response<Moment>>{
    const url = `${environment.baseApiUrl}/api/moments/${id}`
    return this.http.get<Response<Moment>>(url)
  }

  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  removeMoment(id:number){
    const url = `${environment.baseApiUrl}/api/moments/${id}`
    return this.http.delete(url)
  }

  editMoment(id:number, formData: FormData): Observable<FormData>{
    const url = `${environment.baseApiUrl}/api/moments/${id}`

    return this.http.put<FormData>(url, formData)
  }
}
