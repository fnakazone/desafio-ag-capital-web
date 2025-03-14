import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from './cliente.service';
import { ICliente } from '../pages/cliente/interface/cliente.interface';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['getToken']);
    authServiceMock.getToken.and.returnValue('fake-token');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ClienteService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a cliente by id', () => {
    const mockCliente: ICliente = { id: 1, nome: 'Cliente Teste'};
    const clienteId = 1;

    service.getOne(clienteId).subscribe(cliente => {
      expect(cliente).toEqual(mockCliente);
    });

    const req = httpMock.expectOne(`${service['URL_CLIENTE']}/${clienteId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('authorization')).toBe('Bearer fake-token');

    req.flush(mockCliente);
  });

  it('should handle error when fetching a cliente by id', () => {
    const clienteId = 1;

    service.getOne(clienteId).subscribe({
      next: () => fail('expected to fail'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${service['URL_CLIENTE']}/${clienteId}`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});