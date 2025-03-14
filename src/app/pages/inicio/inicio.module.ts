import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { InicioComponent } from './inicio.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    ImageModule,
    DividerModule,
    CardModule,
  ]
})
export class InicioModule { }