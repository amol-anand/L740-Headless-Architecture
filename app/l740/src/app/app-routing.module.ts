import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'conference-speakers',
    loadChildren: () => import('./conference-speakers/conference-speakers.module').then( m => m.ConferenceSpeakersPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'adventures',
    loadChildren: () => import('./adventures/adventures.module').then( m => m.AdventuresPageModule)
  },
  {
    path: 'faq-assets-api',
    loadChildren: () => import('./faq-assets-api/faq-assets-api.module').then( m => m.FAQAssetsAPIPageModule)
  },
  {
    path: 'contributors',
    loadChildren: () => import('./contributors/contributors.module').then( m => m.ContributorsPageModule)
  },
  {
    path: 'contributor-details',
    loadChildren: () => import('./contributor-details/contributor-details.module').then( m => m.ContributorDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
