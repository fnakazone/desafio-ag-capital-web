import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ClienteListComponent } from './cliente-list.component';
import { ClienteService } from '../../../services/cliente.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MessageService } from 'primeng/api';
import { ICliente } from '../interface/cliente.interface';
import { IProjeto } from '../../projeto/interface/projeto.interface';
import { IAtividade } from '../../atividade/interface/atividade.interface';
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

describe('ClienteListComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let atividadeService: jasmine.SpyObj<AtividadeService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;

  const mockClientes: ICliente[] = [
    {
      id: 1,
      nome: 'Cliente 1',
      projetos: [
        { id: 1, nome: 'Projeto 1', atividades: [{ id: 1, nome: 'Atividade 1', descricao: 'Descrição 1', projeto: { id: 1 }, status: { id: 1, nome: 'NOVA' } }] },
        { id: 2, nome: 'Projeto 2', atividades: [] }
      ]
    }
  ];

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getAll']);
    const atividadeServiceSpy = jasmine.createSpyObj('AtividadeService', ['save']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ClienteListComponent],
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
      providers: [
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: AtividadeService, useValue: atividadeServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
    atividadeService = TestBed.inject(AtividadeService) as jasmine.SpyObj<AtividadeService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    formBuilder = TestBed.inject(FormBuilder);
    component.formularioAtividade = formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClientes and criarFormulario on ngOnInit', () => {
    spyOn(component, 'getClientes');
    spyOn(component, 'criarFormulario');

    component.ngOnInit();

    expect(component.getClientes).toHaveBeenCalled();
    expect(component.criarFormulario).toHaveBeenCalled();
  });

  it('should fetch clientes and update listaClientes', () => {
    clienteService.getAll.and.returnValue(of(mockClientes));

    component.getClientes();

    expect(clienteService.getAll).toHaveBeenCalled();
    expect(component.listaClientes).toEqual(mockClientes);
  });

  it('should open projetos dialog and set listaProjetos', () => {
    const cliente: ICliente = mockClientes[0];
    component.projetos(cliente);

    expect(component.listaProjetos).toEqual(cliente.projetos??[]);
    expect(component.dialogProjetos).toBeTrue();
  });

  it('should open atividades dialog and set listaAtividades', () => {
    const cliente = mockClientes[0];

    if (!cliente?.projetos || cliente.projetos.length === 0) {
      fail('Nenhum projeto encontrado');
      return;
    }
  
    const projeto: IProjeto = cliente.projetos[0];
    component.atividades(projeto);

    expect(component.listaAtividades).toEqual(projeto.atividades||[]);
    expect(component.idProjeto).toBe(projeto.id||0);
    expect(component.dialogAtividade).toBeTrue();
  });

  it('should calculate total atividades for a cliente', () => {
    const cliente: ICliente = mockClientes[0];
    const totalAtividades = component.getTotalAtividades(cliente);

    expect(totalAtividades).toBe(1); 
  });

  it('should save atividade and update listaAtividades', () => {
    const novaAtividade: IAtividade = {
      nome: 'Nova Atividade',
      descricao: 'Descrição Nova',
      projeto: { id: 1 },
      status: { id: 1, nome: 'NOVA' }
    };

    atividadeService.save.and.returnValue(Promise.resolve(novaAtividade));
    component.idProjeto = 1;
    component.formularioAtividade.setValue({
      nome: 'Nova Atividade',
      descricao: 'Descrição Nova'
    });

    component.salvarAtividade();

    expect(atividadeService.save).toHaveBeenCalledWith(novaAtividade);
    expect(component.listaAtividades).toContain(novaAtividade);
    expect(component.dialogNovaAtividade).toBeFalse();
    expect(component.formularioAtividade.value).toEqual({ nome: null, descricao: null });
  });

  it('should close dialogs and reset form', () => {
    component.fecharDialogProjetos();
    component.fecharDialogAtividades();
    component.cancelarNovaAtividade();

    expect(component.dialogProjetos).toBeFalse();
    expect(component.dialogAtividade).toBeFalse();
    expect(component.dialogNovaAtividade).toBeFalse();
    expect(component.formularioAtividade.value).toEqual({ nome: null, descricao: null });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component['_unsubscribeAll'], 'next');
    spyOn(component['_unsubscribeAll'], 'complete');

    component.ngOnDestroy();

    expect(component['_unsubscribeAll'].next).toHaveBeenCalledWith('');
    expect(component['_unsubscribeAll'].complete).toHaveBeenCalled();
  });

  it('should create the form with nome and descricao controls', () => {
    component.criarFormulario();
    expect(component.formularioAtividade instanceof FormGroup).toBeTrue();
    expect(component.formularioAtividade.contains('nome')).toBeTrue();
    expect(component.formularioAtividade.contains('descricao')).toBeTrue();
  });

  it('should have required validators on nome and descricao controls', () => {
    component.criarFormulario();
    const nomeControl = component.formularioAtividade.get('nome');
    const descricaoControl = component.formularioAtividade.get('descricao');
    expect(nomeControl?.hasError('required')).toBeTrue();
    expect(descricaoControl?.hasError('required')).toBeTrue();
  });

  it('should navigate to cliente/editar/{id} when editar is called', () => {
    const navigateSpy = spyOn(router, 'navigate'); 

    const testId = 123;
    component.editar(testId);
    expect(navigateSpy).toHaveBeenCalledWith(['cliente/editar/', testId]);
  });

  it('should set listaProjetos to empty array and dialogProjetos to true when cliente.projetos is undefined', () => {
    const cliente: ICliente = {
      id: 1,
      nome: 'Cliente Teste',
      descricao: 'Descrição do Cliente',
      projetos: undefined,
    };
    component.projetos(cliente);
    expect(component.listaProjetos).toEqual([]);
    expect(component.dialogProjetos).toBeTrue();
  });

  it('should set listaAtividades to empty array and idProjeto to 0 when projeto is undefined', () => {
    const projeto: IProjeto = {
      id: undefined,
      nome: 'Projeto Sem ID',
      descricao: 'Descrição',
      atividades: undefined,
    };

    component.atividades(projeto);

    expect(component.listaAtividades).toEqual([]);
    expect(component.idProjeto).toBe(0);
    expect(component.dialogAtividade).toBeTrue();
  });

  it('should return 0 when cliente.projetos is undefined', () => {
    const cliente: ICliente = { id: 1, nome: 'Cliente Teste', projetos: undefined };
    expect(component.getTotalAtividades(cliente)).toBe(0);
  });

  it('should return 0 when cliente.projetos is an empty array', () => {
    const cliente: ICliente = { id: 2, nome: 'Cliente Teste', projetos: [] };
    expect(component.getTotalAtividades(cliente)).toBe(0);
  });

  it('should return 0 when all projects have no activities (undefined or empty)', () => {
    const cliente: ICliente = {
      id: 3,
      nome: 'Cliente Teste',
      projetos: [
        { id: 1, nome: 'Projeto 1', atividades: undefined },
        { id: 2, nome: 'Projeto 2', atividades: [] },
      ],
    };
    expect(component.getTotalAtividades(cliente)).toBe(0);
  });

  it('should set dialogNovaAtividade to true when novaAtividade is called', () => {
    component.dialogNovaAtividade = false; 
    component.novaAtividade();
    expect(component.dialogNovaAtividade).toBeTrue();
  });

  it('deve definir o idClienteExclusao e abrir o diálogo de confirmação ao chamar confirmacaoExclusao()', () => {
    const idTeste = 123;
    
    component.confirmacaoExclusao(idTeste);
    
    expect(component.idClienteExclusao).toBe(idTeste);
    expect(component.dialogConfirmacaoExclusao).toBeTrue();
  });

  it('deve fechar o diálogo de confirmação ao chamar fecharDialogConfirmacaoExclusao()', () => {
    component.dialogConfirmacaoExclusao = true; // Simula o diálogo aberto
    
    component.fecharDialogConfirmacaoExclusao();
    
    expect(component.dialogConfirmacaoExclusao).toBeFalse();
  });

});
