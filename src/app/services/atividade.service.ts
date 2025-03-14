import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envivonment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ICliente } from '../pages/cliente/interface/cliente.interface';
import { IAtividade } from '../pages/atividade/interface/atividade.interface';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private baseAPiURL: string = environment.baseApi;
  private URL_ATIVIDADE = `${this.baseAPiURL}atividade`;
  constructor(private _authService: AuthService,private _http: HttpClient) {     
  }

  public getAll(): Observable<IAtividade[]> {
    return this._http
      .get<IAtividade[]>(`${this.URL_ATIVIDADE}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }

  async save(atividade: IAtividade): Promise<IAtividade> {
    return await firstValueFrom(this._http
      .post<IAtividade>(`${this.URL_ATIVIDADE}`,
        atividade,
        {headers: { authorization: `Bearer ${this._authService.getToken()}` },
      }));
  }
}
