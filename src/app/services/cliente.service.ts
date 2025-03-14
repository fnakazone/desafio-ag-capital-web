import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/envivonment';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ICliente } from '../pages/cliente/interface/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseAPiURL: string = environment.baseApi;
  private URL_CLIENTE = `${this.baseAPiURL}cliente`;
  constructor(private _authService: AuthService,private _http: HttpClient) {     
  }

  public getAll(): Observable<ICliente[]> {
    return this._http
      .get<ICliente[]>(`${this.URL_CLIENTE}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }

  public getOne(id: number): Observable<ICliente> {
    return this._http
      .get<ICliente>(`${this.URL_CLIENTE}/${id}`, {
        headers: { authorization: `Bearer ${this._authService.getToken()}` },
      });
  }

  async save(cliente: ICliente): Promise<ICliente> {
    return await firstValueFrom(this._http
      .post<ICliente>(`${this.URL_CLIENTE}`,
        cliente,
        {headers: { authorization: `Bearer ${this._authService.getToken()}` },
      }));
  }

  async update(id: number, cliente: ICliente): Promise<ICliente> {
    return await firstValueFrom(this._http
      .put<ICliente>(`${this.URL_CLIENTE}/${id}`,
        cliente,
        {headers: { authorization: `Bearer ${this._authService.getToken()}` },
      }));
  }
}
