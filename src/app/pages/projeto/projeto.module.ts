import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

const routes = [
  {
    path: '',
    component: ProjetoListComponent,

  },
  {
    path: 'novo',
    loadChildren: () =>
      import('./projeto-form/projeto-form.module').then(
        (rota) => rota.ProjetoFormModule
      ),
  },
  {
    path: 'editar/:id',
    loadChildren: () =>
      import('./projeto-form/projeto-form.module').then(
        (rota) => rota.ProjetoFormModule
      ),
  },
];

@NgModule({
  declarations: [ProjetoListComponent, ProjetoFormComponent],
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
    DialogModule
    
  ]
})
export class ProjetoModule { }