import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envivonment';
import { Observable } from 'rxjs';
import { IStatusProjeto } from '../pages/interface/status-projeto.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusProjetoService {
  private baseAPiURL: string = environment.baseApi;
  private URL_STATUS_PROJETO = `${this.baseAPiURL}statusProjeto`;
  constructor(private _authService: AuthService,private _http: HttpClient) {     
  }

  public getAll(): Observable<IStatusProjeto[]> {
    return this._http
      .get<IStatusProjeto[]>(`${this.URL_STATUS_PROJETO}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }
}
