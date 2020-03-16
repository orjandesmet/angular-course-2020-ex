import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ClientResolverService } from './client-resolver.service';
import { ClientsComponent } from './clients.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { ClientOverviewComponent } from './components/client-overview/client-overview.component';
import { NewClientComponent } from './components/new-client/new-client.component';

const routes: Route[] = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: '',
        component: ClientOverviewComponent
      },
      {
        path: 'new',
        component: NewClientComponent
      },
      {
        path: ':clientId',
        component: ClientDetailComponent,
        resolve: {
          client: ClientResolverService
        }
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientsRoutingModule { }
