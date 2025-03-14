import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { AtividadeService } from './atividade.service';
import { IAtividade } from '../pages/atividade/interface/atividade.interface';

describe('AtividadeService', () => {
  let service: AtividadeService;
  let httpMock: HttpTestingController;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['getToken']);
    authServiceMock.getToken.and.returnValue('fake-token');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AtividadeService,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(AtividadeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all atividades', () => {
    const mockAtividades: IAtividade[] = [
      { id: 1, nome: 'Atividade 1', descricao: 'Descrição 1' },
      { id: 2, nome: 'Atividade 2', descricao: 'Descrição 2' }
    ];

    service.getAll().subscribe(atividades => {
      expect(atividades).toEqual(mockAtividades);
    });

    const req = httpMock.expectOne(`${service['URL_ATIVIDADE']}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('authorization')).toBe('Bearer fake-token');

    req.flush(mockAtividades);
  });

  it('should handle error on getAll', () => {
    service.getAll().subscribe({
      next: () => fail('expected to fail'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${service['URL_ATIVIDADE']}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });

});