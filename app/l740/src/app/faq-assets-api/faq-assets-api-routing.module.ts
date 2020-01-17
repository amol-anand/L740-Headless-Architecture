import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FAQAssetsAPIPage } from './faq-assets-api.page';

const routes: Routes = [
  {
    path: '',
    component: FAQAssetsAPIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FAQAssetsAPIPageRoutingModule {}
