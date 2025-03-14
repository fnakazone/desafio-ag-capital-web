import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IProjeto } from '../interface/projeto.interface';
import { ProjetoService } from 'src/app/services/projeto.service';
import { Router } from '@angular/router';
import { IAtividade } from '../../atividade/interface/atividade.interface';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.css']
})
export class ProjetoListComponent implements OnInit, OnDestroy {
  private readonly _unsubscribeAll: Subject<any>;
  public listaProjetos: IProjeto[] = [];
  public dialogAtividades: boolean = false;
  public listaAtividades: IAtividade[]=[];

  constructor(    
    private readonly _projetoService: ProjetoService,
    private readonly _router: Router,

  ) {
    this._unsubscribeAll = new Subject();
  }
  
  ngOnInit() {
    this.getProjetos();
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

  atividades(projeto: IProjeto){
    this.listaAtividades = projeto?.atividades ?? [];
    this.dialogAtividades = true;
  }

  fecharDialogAtividades(){
    this.dialogAtividades = false;
  }  

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }
}
