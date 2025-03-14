import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteService } from 'src/app/services/cliente.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Importação correta
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { AtividadeFormComponent } from './atividade-form.component';
import { AtividadeService } from 'src/app/services/atividade.service';

describe('ProjetoFormComponent', () => {
  let component: AtividadeFormComponent;
  let fixture: ComponentFixture<AtividadeFormComponent>;
  let atividadeService: jasmine.SpyObj<AtividadeService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {

    const atividadeServiceSpy = jasmine.createSpyObj('AtividadeService', ['save']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

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
      ], // ✅ Adiciona suporte ao HttpClient
      declarations: [AtividadeFormComponent],
      providers: [ClienteService, AuthService,
        FormBuilder,
        { provide: AtividadeService, useValue: atividadeServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ],
      
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeFormComponent);
    component = fixture.componentInstance;
    atividadeService = TestBed.inject(AtividadeService) as jasmine.SpyObj<AtividadeService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    formBuilder = TestBed.inject(FormBuilder);

    // Configura o formulário para os testes
    component.formulario = formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      projeto: formBuilder.group({
        id: ['', Validators.required]
      }),
      status: formBuilder.group({
        id: ['', Validators.required]
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});