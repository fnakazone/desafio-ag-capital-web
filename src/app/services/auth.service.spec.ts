import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('authToken');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store the token in localStorage', () => {
    const mockResponse = { token: 'fake-token' };
    const username = 'testuser';
    const password = 'testpass';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('authToken')).toBe('fake-token');
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const username = 'testuser';
    const password = 'testpass';

    service.login(username, password).subscribe({
      next: () => fail('expected to fail'),
      error: (error) => {
        expect(error.status).toBe(401);
        expect(localStorage.getItem('authToken')).toBeNull();
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should remove the token from localStorage on logout', () => {
    localStorage.setItem('authToken', 'fake-token');

    service.logout();

    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should return the token from localStorage', () => {
    localStorage.setItem('authToken', 'fake-token');

    const token = service.getToken();

    expect(token).toBe('fake-token');
  });

  it('should return null if no token is stored', () => {
    const token = service.getToken();

    expect(token).toBeNull();
  });

  it('should return true if a token is stored', () => {
    localStorage.setItem('authToken', 'fake-token');

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeTrue();
  });

  it('should return false if no token is stored', () => {
    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeFalse();
  });
});