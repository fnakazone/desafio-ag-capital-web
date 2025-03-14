import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envivonment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ICliente } from '../pages/cliente/interface/cliente.interface';
import { IProjeto } from '../pages/projeto/interface/projeto.interface';
import { IStatusAtividade } from '../pages/interface/status-atividade.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusAtividadeService {
  private baseAPiURL: string = environment.baseApi;
  private URL_STATUS_ATIVIDADE = `${this.baseAPiURL}statusAtividade`;
  constructor(private _authService: AuthService,private _http: HttpClient) {     
  }

  public getAll(): Observable<IStatusAtividade[]> {
    return this._http
      .get<IStatusAtividade[]>(`${this.URL_STATUS_ATIVIDADE}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }
}
