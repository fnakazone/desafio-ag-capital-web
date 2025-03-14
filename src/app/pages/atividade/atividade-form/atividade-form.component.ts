import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IProjeto } from '../../projeto/interface/projeto.interface';
import { IStatusAtividade } from '../../interface/status-atividade.interface';
import { ProjetoService } from 'src/app/services/projeto.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { StatusAtividadeService } from 'src/app/services/status-atividade.service';
import { MessageService } from 'primeng/api';
import { IAtividade } from '../interface/atividade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-atividade-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.css'],
  providers: [MessageService],
})
export class AtividadeFormComponent implements OnInit {
  private readonly _unsubscribeAll: Subject<any>;

  formulario!: FormGroup;
  public listaProjetos: IProjeto[] = [];
  public statusAtividade: IStatusAtividade[] = [];

  constructor(    
    private readonly _atividadeService: AtividadeService,
    private readonly _projetoService: ProjetoService,
    private readonly _statusAtividadeService: StatusAtividadeService,
    private messageService: MessageService   

  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
      this.criarFormulario();
      this.getProjetos();
      this.getStatusAtividade();
  }

  criarFormulario(){
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      projeto: new FormControl('', [Validators.required]),
      status: new FormControl('NOVO', [Validators.required]),
    });
  }

  getProjetos() {
    this._projetoService
      .getAll()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.listaProjetos = data
      });
  }

  getStatusAtividade() {
    this._statusAtividadeService
      .getAll()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.statusAtividade = data
      });
  }

  salvar(){
    if (this.formulario.valid){
      var atividade: IAtividade ={
        nome: this.formulario.value.nome,
        descricao: this.formulario.value.descricao,
        projeto: {
         id: this.formulario.value.projeto.id,  
        },
        status: {
          id: this.formulario.value.status.id,
        }

      }
      this._atividadeService.save(atividade);
      this.formulario.reset();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atividade cadastrada com sucesso!' });
    }
  }  

}