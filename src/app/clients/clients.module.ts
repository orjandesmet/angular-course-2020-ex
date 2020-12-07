import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientOverviewComponent } from './components/client-overview/client-overview.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [ClientsComponent, ClientTableComponent, FullNamePipe, ClientFormComponent, ClientDetailComponent, ClientOverviewComponent, NewClientComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    ClientsRoutingModule
  ],
  exports: [ClientsComponent]
})
export class ClientsModule { }
