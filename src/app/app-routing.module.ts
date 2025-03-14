import { ClienteModule } from './pages/cliente/cliente.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ClienteListComponent } from './pages/cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ProjetoListComponent } from './pages/projeto/projeto-list/projeto-list.component';
import { ProjetoFormComponent } from './pages/projeto/projeto-form/projeto-form.component';
import { AtividadeListComponent } from './pages/atividade/atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './pages/atividade/atividade-form/atividade-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteListComponent },
  { path: 'cliente/novo', component: ClienteFormComponent },
  { path: 'cliente/editar/:id', component: ClienteFormComponent },
  { path: 'projeto', component: ProjetoListComponent },
  { path: 'projeto/novo', component: ProjetoFormComponent },
  { path: 'projeto/editar/:id', component: ProjetoFormComponent },
  { path: 'atividade', component: AtividadeListComponent },
  { path: 'atividade/nova', component: AtividadeFormComponent },
  { path: 'atividade/editar/:id', component: AtividadeFormComponent },
  { path: 'inicio', component: InicioComponent},
  {
    path: '**',
    redirectTo: 'login',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
