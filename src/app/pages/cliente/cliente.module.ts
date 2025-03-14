import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

const routes = [
  {
    path: '',
    component: ClienteListComponent,

  },
  {
    path: 'novo',
    loadChildren: () =>
      import('./cliente-form/cliente-form.module').then(
        (rota) => rota.ClienteFormModule
      ),
  },
  {
    path: 'editar/:id',
    loadChildren: () =>
      import('./cliente-form/cliente-form.module').then(
        (rota) => rota.ClienteFormModule
      ),
  },
];

@NgModule({
  declarations: [ClienteListComponent, ClienteFormComponent],
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
export class ClienteModule { }
