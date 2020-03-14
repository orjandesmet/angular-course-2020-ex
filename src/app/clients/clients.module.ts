import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';



@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule
  ],
  exports: [ClientsComponent]
})
export class ClientsModule { }
