import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'logout']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent }, 
          { path: 'inicio', component: DummyComponent } 
        ])
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should set autenticado to true if user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    component.ngOnInit();
    expect(component.autenticado).toBeTrue();
    expect(authService.logout).not.toHaveBeenCalled();
  });

  it('should call logout if user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    spyOn(component, 'logout');
    component.ngOnInit();
    expect(component.autenticado).toBeFalse();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should initialize menu items correctly', () => {
    component.ngOnInit();
    expect(component.items.length).toBe(5);
    expect(component.items[0].label).toBe('Home');
    expect(component.items[0].icon).toBe('pi pi-home');
    expect(component.items[0].routerLink).toEqual(['/inicio']);
    expect(component.items[4].label).toBe('Sair');
    expect(component.items[4].icon).toBe('pi pi-sign-out');
    expect(component.items[4].command).toBeDefined(); 
  });

  xit('should show content when navigating to other routes', () => {
    const navigationEndEvent = new NavigationEnd(1, '/inicio', '/inicio');
    (router.events as any) = of(navigationEndEvent);
    component.ngOnInit();
    expect(component.showContent).toBeTrue();
  });

  it('should call authService.logout and navigate to login on logout', () => {
    spyOn(router, 'navigate');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

@Component({ template: '' })
class DummyComponent {}
