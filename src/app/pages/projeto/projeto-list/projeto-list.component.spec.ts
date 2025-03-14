import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteService } from 'src/app/services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProjetoService } from 'src/app/services/projeto.service';
import { StatusProjetoService } from 'src/app/services/status-projeto.service';
import { MessageService } from 'primeng/api';
import { ProjetoListComponent } from './projeto-list.component';
import { IProjeto } from '../interface/projeto.interface';

describe('ProjetoListComponent', () => {
  let component: ProjetoListComponent;
  let fixture: ComponentFixture<ProjetoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                CommonModule,
                TableModule,
                CardModule,
                ToolbarModule,  
                ButtonModule,
                DropdownModule,
                DividerModule,
                FormsModule,
                ReactiveFormsModule,
                ToastModule,
                DialogModule
      ], 
      declarations: [ProjetoListComponent],
      providers: [ClienteService, AuthService],
      
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set listaAtividades and open dialog when projeto has atividades', () => {
    const mockProjeto: IProjeto = {
      id: 1,
      nome: 'Projeto Teste',
      atividades: [
        { id: 1, nome: 'Atividade 1', descricao: 'Descrição 1' },
        { id: 2, nome: 'Atividade 2', descricao: 'Descrição 2' }
      ]
    };
  
    component.atividades(mockProjeto);
  
    expect(component.listaAtividades).toEqual(mockProjeto.atividades ?? []);
    expect(component.dialogAtividades).toBeTrue();
  });

  it('should set listaAtividades to empty array and open dialog when projeto has no atividades', () => {
    const mockProjeto: IProjeto = {
      id: 1,
      nome: 'Projeto Teste',
      atividades: []
    };
  
    component.atividades(mockProjeto);
  
    expect(component.listaAtividades).toEqual([]);
    expect(component.dialogAtividades).toBeTrue();
  });

  it('should close the dialog', () => {
    component.dialogAtividades = true;
  
    component.fecharDialogAtividades();
  
    expect(component.dialogAtividades).toBeFalse();
  });
});
