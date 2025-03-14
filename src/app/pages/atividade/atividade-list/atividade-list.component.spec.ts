import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { AtividadeListComponent } from './atividade-list.component';
import { AtividadeService } from 'src/app/services/atividade.service';
import { IAtividade } from '../interface/atividade.interface';
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
describe('AtividadeListComponent', () => {
  let component: AtividadeListComponent;
  let fixture: ComponentFixture<AtividadeListComponent>;
  let atividadeService: jasmine.SpyObj<AtividadeService>;
  let router: jasmine.SpyObj<Router>;

  const mockAtividades: IAtividade[] = [
    { id: 1, nome: 'Atividade 1', descricao: 'Descrição 1', projeto: {id: 1}, status: {id: 1}},
    { id: 2, nome: 'Atividade 2', descricao: 'Descrição 2', projeto: {id: 2}, status: {id: 2} }
  ];

  beforeEach(async () => {
    const atividadeServiceSpy = jasmine.createSpyObj('AtividadeService', ['getAll']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AtividadeListComponent],
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
        { provide: AtividadeService, useValue: atividadeServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeListComponent);
    component = fixture.componentInstance;
    atividadeService = TestBed.inject(AtividadeService) as jasmine.SpyObj<AtividadeService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProjetos on ngOnInit', () => {
    spyOn(component, 'getProjetos');
    component.ngOnInit();
    expect(component.getProjetos).toHaveBeenCalled();
  });

  it('should fetch atividades and update listaAtividades', () => {
    atividadeService.getAll.and.returnValue(of(mockAtividades));
    component.getProjetos();
    expect(atividadeService.getAll).toHaveBeenCalled();
    expect(component.listaAtividades).toEqual(mockAtividades);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component['_unsubscribeAll'], 'next');
    spyOn(component['_unsubscribeAll'], 'complete');
    component.ngOnDestroy();
    expect(component['_unsubscribeAll'].next).toHaveBeenCalledWith('');
    expect(component['_unsubscribeAll'].complete).toHaveBeenCalled();
  });
});