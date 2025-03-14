import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule ,    
    CommonModule,
    ImageModule,
    DividerModule,
    CardModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
