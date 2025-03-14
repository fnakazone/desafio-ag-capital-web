import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteFormComponent } from './cliente-form.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
// Mock do ClienteService
class MockClienteService {
  save(cliente: any) {
    return Promise.resolve();
  }
  update(id: number, cliente: any) {
    return Promise.resolve();
  }
  getOne(id: number) {
    return of({ nome: 'Cliente Teste', descricao: 'Descrição Teste' });
  }
}

// Mock do ActivatedRoute
class MockActivatedRoute {
  params = of({ id: '1' });
}
let formBuilder: FormBuilder;

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;
  let clienteService: ClienteService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteFormComponent],
      imports: [                
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
        DialogModule],
      providers: [
        { provide: ClienteService, useClass: MockClienteService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        MessageService,
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    messageService = TestBed.inject(MessageService);

    formBuilder = TestBed.inject(FormBuilder);    
    component.formulario = formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });

    fixture.detectChanges();
  });

  it('should not call setValidationsSubmitANDEnviar if the form is invalid', () => {
    component.formulario.setValue({ nome: '', descricao: '' });
    spyOn(component, 'setValidationsSubmitANDEnviar');
    component.ngSubmit();
    expect(component.setValidationsSubmitANDEnviar).not.toHaveBeenCalled();
  });
  it('should call setValidationsSubmitANDEnviar if the form is valid', () => {
    component.formulario.setValue({ nome: 'Nome válido', descricao: 'Descrição válida' });
    spyOn(component, 'setValidationsSubmitANDEnviar');
    component.ngSubmit();
    expect(component.setValidationsSubmitANDEnviar).toHaveBeenCalled();
  });

  it('should call setUpdate when isUpdate is true', () => {
    component.formulario.setValue({ nome: 'Nome Atualizado', descricao: 'Descrição Atualizada' });
    component.isUpdate = true;
    spyOn(component, 'setUpdate');
    component.setValidationsSubmitANDEnviar();
    expect(component.setUpdate).toHaveBeenCalled();
    expect(component.cliente).toEqual({ nome: 'Nome Atualizado', descricao: 'Descrição Atualizada' });
  });
  it('should call setCreate when isUpdate is false', () => {
    component.formulario.setValue({ nome: 'Novo Cliente', descricao: 'Descrição Cliente' });
    component.isUpdate = false;
    spyOn(component, 'setCreate');
    component.setValidationsSubmitANDEnviar();
    expect(component.setCreate).toHaveBeenCalled();
    expect(component.cliente).toEqual({ nome: 'Novo Cliente', descricao: 'Descrição Cliente' });
  });
    
  it('should get client data and patch the form on initialization', () => {
    spyOn(clienteService, 'getOne').and.callThrough();  
    component.ngOnInit();
    expect(component.id).toBe(1);  
    expect(clienteService.getOne).toHaveBeenCalledWith(1);  
    expect(component.formulario.value.nome).toBe('Cliente Teste');  
    expect(component.formulario.value.descricao).toBe('Descrição Teste'); 
  });

});
