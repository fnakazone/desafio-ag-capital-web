import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { ICliente } from '../interface/cliente.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [MessageService]
})
export class ClienteFormComponent implements OnInit {
  private readonly _unsubscribeAll: Subject<any>;
  formulario!: FormGroup;
  public id: number = 0;
  public isUpdate: boolean = false;
  public cliente!: ICliente;

  constructor(    
    private readonly _clienteService: ClienteService,
    private messageService: MessageService,
    private readonly _route: ActivatedRoute,

  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
      this.criarFormulario();
      this.getParams();
  }

  criarFormulario(){
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }

  getParams() {
    this._route.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        this.id = Number(params['id']);
        if (!isNaN(this.id)) {
          this.getShow();
        }
      });
  }

  getShow(): void {
    this._clienteService
      .getOne(this.id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.isUpdate = true;
        this.formulario.patchValue({
          nome: data.nome,
          descricao: data.descricao,
        });
      });
  }

  ngSubmit() {
    if (this.formulario.invalid) {
      return;
    }

    this.setValidationsSubmitANDEnviar();
  }

  setValidationsSubmitANDEnviar() {
    this.cliente={
      nome: this.formulario.value.nome,
      descricao: this.formulario.value.descricao,
    }

    if (this.isUpdate) {
      this.setUpdate();
      return;
    }

    this.setCreate();
  }

  setCreate() {
    this._clienteService.save(this.cliente).then(() => {
      this.formulario.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cliente cadastrado com sucesso!',
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao cadastrar cliente!',
      });
    });
  }
  
  setUpdate() {
    this._clienteService.update(this.id, this.cliente).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cliente atualizado com sucesso!',
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao atualizar cliente!',
      });
    });
  }
  

 ngOnDestroy(): void {
  this._unsubscribeAll.next('');
  this._unsubscribeAll.complete();
  }
}
