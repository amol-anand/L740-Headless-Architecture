import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConferenceSpeakersPage } from './conference-speakers.page';

const routes: Routes = [
  {
    path: '',
    component: ConferenceSpeakersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConferenceSpeakersPageRoutingModule {}
