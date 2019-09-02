import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout';
import { SpotifyAuthModule } from 'spotify-auth';
import { UserComponent } from './user.component';

const routes: Routes = [  
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'album/:id',
        loadChildren: () =>
          import('./pages/detail/detail.module').then(m => m.DetailModule)
      },
      {
        path: 'user',
        component: UserComponent,
      },
      // {
      //   path: 'about',
      //   loadChildren: () =>
      //     import('@modules/about/about.module').then(m => m.AboutModule)
      // },
      // {
      //   path: 'contact',
      //   loadChildren: () =>
      //     import('@modules/contact/contact.module').then(m => m.ContactModule)
      // }
    ]
  },
  SpotifyAuthModule.authRoutes()[0]
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SpotifyAuthModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
