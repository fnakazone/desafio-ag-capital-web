import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ClienteFormComponent } from './cliente-form.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ClienteFormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DividerModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class ClienteFormModule { }
