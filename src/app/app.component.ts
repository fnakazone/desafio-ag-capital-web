import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sidebarVisible: boolean = false;
  showContent: boolean = true;
  autenticado: boolean = false;
  items: MenuItem[] = [];

  title = 'Francis';

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  ngOnInit() {
    this.autenticado = this.authService.isAuthenticated();
    if(!this.autenticado)
      this.logout();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/inicio']
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        items: [
          { label: 'Novo Cliente', icon: 'pi pi-user-plus', routerLink: ['/cliente/novo'] },
          { label: 'Listar Clientes', icon: 'pi pi-list', routerLink: ['/cliente'] }
        ]
      },
      {
        label: 'Projetos',
        icon: 'pi pi-briefcase',  
        items: [
          { label: 'Novo Projeto', icon: 'pi pi-briefcase', routerLink: ['/projeto/novo'] },  
          { label: 'Listar Projetos', icon: 'pi pi-list', routerLink: ['/projeto'] }
        ]
      },
      {
        label: 'Atividades',
        icon: 'pi pi-calendar',  
        items: [
          { label: 'Nova Atividade', icon: 'pi pi-calendar-plus', routerLink: ['/atividade/nova'] },  
          { label: 'Listar Atividades', icon: 'pi pi-list', routerLink: ['/atividade'] }
        ]
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showContent = this.router.url !== '/login'; 
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
