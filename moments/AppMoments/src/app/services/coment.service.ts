import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comments } from '../Comments';
import { Response } from '../Response';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComentService {

  private baseApiUrl = environment.baseApiUrl

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  createComment(data: Comments): Observable<Response<Comments>>{

    const apiUrl = `${this.baseApiUrl}/api/moments/${data.momentId}/comments`

    return this.http.post<Response<Comments>>(apiUrl, data)
  }
}
