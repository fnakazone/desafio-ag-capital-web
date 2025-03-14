import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetoFormComponent } from './projeto-form.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Importação correta
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
import { MessageService } from 'primeng/api';
import { IProjeto } from '../interface/projeto.interface';

describe('ProjetoFormComponent', () => {
  let component: ProjetoFormComponent;
  let fixture: ComponentFixture<ProjetoFormComponent>;
  let projetoService: jasmine.SpyObj<ProjetoService>;
  let messageService: jasmine.SpyObj<MessageService>;

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
      declarations: [ProjetoFormComponent],
      providers: [ClienteService, AuthService,MessageService],
      
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetoFormComponent);
    projetoService = TestBed.inject(ProjetoService) as jasmine.SpyObj<ProjetoService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call save and display success message if the form is valid', async () => {
    const projetoMock: IProjeto = {
      id: 1,
      nome: 'Projeto Teste',
      descricao: 'Descrição do Projeto',
      cliente: { id: 1 },
      status: { id: 2 }
    };
    
    spyOn(projetoService, 'save').and.returnValue(Promise.resolve(projetoMock)); 
    spyOn(messageService, 'add'); 
    component.formulario.setValue({
      nome: 'Projeto Teste',
      descricao: 'Descrição do Projeto',
      cliente: { id: 1 },
      status: { id: 2 }
    });

    await component.salvar(); 

    expect(projetoService.save).toHaveBeenCalledWith({
      nome: 'Projeto Teste',
      descricao: 'Projeto Teste', 
      cliente: { id: 1 },
      status: { id: 2 }
    });
  
  });
  
});
