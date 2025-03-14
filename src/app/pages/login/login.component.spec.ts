import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should call AuthService.login with username and password', () => {
    component.username = 'testuser';
    component.password = 'password123';
    authService.login.and.returnValue(of({ token: 'fake-jwt-token' }));
    component.login();
    expect(authService.login).toHaveBeenCalledWith('testuser', 'password123');
  });

  it('should redirect to /inicio on successful login', () => {
    authService.login.and.returnValue(of({ token: 'fake-jwt-token' }));
    component.username = 'testuser';
    component.password = 'password123';
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('should set errorMessage on failed login', () => {
    authService.login.and.returnValue(throwError(() => new Error('Usuário ou senha inválidos')));
    component.username = 'testuser';
    component.password = 'password123';
    component.login();
    expect(component.errorMessage).toBe('Usuário ou senha inválidos');
  });
});
