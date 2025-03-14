import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IAtividade } from '../interface/atividade.interface';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Router } from '@angular/router';
import { IProjeto } from '../../projeto/interface/projeto.interface';

@Component({
  selector: 'app-atividade-list',
  templateUrl: './atividade-list.component.html',
  styleUrls: ['./atividade-list.component.css']
})
export class AtividadeListComponent implements OnInit, OnDestroy {
  private readonly _unsubscribeAll: Subject<any>;
  public listaAtividades: IAtividade[] = [];

  constructor(    
    private readonly _atividadeService: AtividadeService,
    private readonly _router: Router,

  ) {
    this._unsubscribeAll = new Subject();
  }
  
  ngOnInit() {
    this.getProjetos();
  }

  getProjetos() {
    this._atividadeService
      .getAll()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.listaAtividades = data
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }
}
