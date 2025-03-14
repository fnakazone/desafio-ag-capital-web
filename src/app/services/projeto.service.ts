import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envivonment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { IProjeto } from '../pages/projeto/interface/projeto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private baseAPiURL: string = environment.baseApi;
  private URL_PROJETO = `${this.baseAPiURL}projeto`;
  constructor(private _authService: AuthService,private _http: HttpClient) {     
  }

  public getAll(): Observable<IProjeto[]> {
    return this._http
      .get<IProjeto[]>(`${this.URL_PROJETO}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }

  async save(projeto: IProjeto): Promise<IProjeto> {
    return await firstValueFrom(this._http
      .post<IProjeto>(`${this.URL_PROJETO}`,
        projeto,
        {headers: { authorization: `Bearer ${this._authService.getToken()}` },
      }));
  }
}
