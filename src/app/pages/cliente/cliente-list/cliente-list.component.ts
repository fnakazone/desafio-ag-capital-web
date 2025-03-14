import { ClienteService } from './../../../services/cliente.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';
import { ICliente } from '../interface/cliente.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { IProjeto } from '../../projeto/interface/projeto.interface';
import { IAtividade } from '../../atividade/interface/atividade.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  providers: [MessageService],

})
export class ClienteListComponent implements OnInit, OnDestroy {
  private readonly _unsubscribeAll: Subject<any>;
  public listaClientes: ICliente[] = [];
  public dialogProjetos: boolean = false;
  public listaProjetos: IProjeto[]=[];
  public dialogAtividade: boolean = false;
  public listaAtividades: IAtividade[]=[];
  public dialogNovaAtividade: boolean = false;

  formularioAtividade!: FormGroup;
  public idProjeto: number = 0;

  constructor(    
    private readonly _clienteService: ClienteService,
    //private readonly _projetoService: ProjetoService,
    private readonly _atividadeService: AtividadeService,
    private messageService: MessageService   ,

    private readonly _router: Router,

  ) {
    this._unsubscribeAll = new Subject();
  }
  
  ngOnInit() {
    this.getClientes();
    this.criarFormulario();

  }
  criarFormulario(){
    this.formularioAtividade = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      //projeto: new FormControl('', [Validators.required]),
      //status: new FormControl('NOVO', [Validators.required]),
    });
  }

  getClientes() {
    this._clienteService
      .getAll()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.listaClientes = data
      });
  }

  projetos(cliente: ICliente){
    this.listaProjetos = cliente?.projetos ?? [];
    this.dialogProjetos = true;
  }

  editar(id: number) {
    this._router.navigate(['cliente/editar/', id]);
  }

  fecharDialogProjetos(){
    this.dialogProjetos = false;
  }

  fecharDialogAtividades(){
    this.dialogAtividade = false;
  }

  atividades(projeto: IProjeto){
    this.listaAtividades = projeto?.atividades ?? [];
    this.idProjeto = projeto?.id ?? 0;
    this.dialogAtividade = true;
  }

  novaAtividade(){    
    this.dialogNovaAtividade = true;
  }

  getTotalAtividades(cliente: ICliente): number {    
    return cliente.projetos?.reduce((total: number, projeto: any) => 
      total + (projeto.atividades?.length || 0), 0) || 0;
  }

  salvarAtividade(){
    if (this.formularioAtividade.valid){
      var atividade: IAtividade ={
        nome: this.formularioAtividade.value.nome,
        descricao: this.formularioAtividade.value.descricao,
        projeto: {
         id: this.idProjeto,  
        },
        status: {
          id: 1, //Status NOVA
          nome: "NOVA"
        }

      }
      this._atividadeService.save(atividade);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade cadastrada com sucesso!' });
      this.dialogNovaAtividade = false;
      this.listaAtividades.push(atividade);
      this.formularioAtividade.reset();
    }
  }  

  cancelarNovaAtividade(){
    this.formularioAtividade.reset();
    this.dialogNovaAtividade = false;
  }

  limparNovaAtividade(){
    this.formularioAtividade.reset();
  }
  
  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }
}
