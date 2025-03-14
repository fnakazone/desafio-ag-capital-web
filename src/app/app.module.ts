import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteModule } from './pages/cliente/cliente.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar'; 
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InicioModule } from './pages/inicio/inicio.module';
import { ClienteFormModule } from './pages/cliente/cliente-form/cliente-form.module';
import { ProjetoModule } from './pages/projeto/projeto.module';
import { ProjetoFormModule } from './pages/projeto/projeto-form/projeto-form.module';
import { AtividadeModule } from './pages/atividade/atividade.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule ,
    ClienteModule,
    ClienteFormModule,
    ProjetoModule,
    ProjetoFormModule,
    AtividadeModule,
    InicioModule,  
    SidebarModule,  
    ButtonModule,
    BrowserAnimationsModule,
    CardModule,
    ToolbarModule,
    MenubarModule,
    ImageModule,
    DividerModule,
    provideAuth(() => getAuth()), BrowserAnimationsModule // Corrigido para usar o Firebase Auth correto
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
