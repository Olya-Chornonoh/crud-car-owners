import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { OwnersComponent } from './owners/owners.component';

const routes: Routes = [
  {
    path: '',
    component: OwnersComponent,
  },
  {
    path: 'new-owner',
    component: OwnerComponent,
  },
  {
    path: 'owner/:id',
    component: OwnerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
