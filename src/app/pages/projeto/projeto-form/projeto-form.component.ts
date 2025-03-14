import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from '../../cliente/interface/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subject, takeUntil } from 'rxjs';
import { ProjetoService } from 'src/app/services/projeto.service';
import { IProjeto } from '../interface/projeto.interface';
import { MessageService } from 'primeng/api';
import { IStatusProjeto } from '../../interface/status-projeto.interface';
import { StatusProjetoService } from 'src/app/services/status-projeto.service';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css'],
  providers: [MessageService],
})
export class ProjetoFormComponent implements OnInit {
  private readonly _unsubscribeAll: Subject<any>;

  formulario!: FormGroup;
  public listaClientes: ICliente[] = [];
  public statusProjeto: IStatusProjeto[] = [];

  constructor(    
    private readonly _projetoService: ProjetoService,
    private readonly _clienteService: ClienteService,
    private readonly _statusProjetoService: StatusProjetoService,
    private messageService: MessageService   

  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
      this.criarFormulario();
      this.getClientes();
      this.getStatusProjeto();
  }

  criarFormulario(){
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      cliente: new FormControl(1, [Validators.required]),
      status: new FormControl(1, [Validators.required]),
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

  getStatusProjeto() {
    this._statusProjetoService
      .getAll()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.statusProjeto = data
      });
  }

  salvar(){
    if (this.formulario.valid){
      var projeto: IProjeto ={
        nome: this.formulario.value.nome,
        descricao: this.formulario.value.nome,
        cliente:{
          id:this.formulario.value.cliente.id,
        }, 
        status:{
          id: this.formulario.value.status.id,
        }
      }
      this._projetoService.save(projeto);
      this.formulario.reset();
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto cadastrado com sucesso!' });
    }
  }  

}
