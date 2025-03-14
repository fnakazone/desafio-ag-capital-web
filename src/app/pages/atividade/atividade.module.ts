import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtividadeListComponent } from './atividade-list/atividade-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';

const routes = [
  {
    path: '',
    component: AtividadeListComponent,

  },
  {
    path: 'nova',
    loadChildren: () =>
      import('./atividade-form/atividade-form.module').then(
        (rota) => rota.AtividadeFormModule
      ),
  },
  {
    path: 'editar/:id',
    loadChildren: () =>
      import('./atividade-form/atividade-form.module').then(
        (rota) => rota.AtividadeFormModule
      ),
  },
];

@NgModule({
  declarations: [AtividadeListComponent, AtividadeFormComponent],
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
    ToastModule
  ]
})
export class AtividadeModule { }
