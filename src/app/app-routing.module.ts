import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./features/profile/edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'view-profile',
    loadChildren: () =>
      import('./features/profile/view-profile/view-profile.module').then(
        (m) => m.ViewProfilePageModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./features/publications/list/list.module').then(
        (m) => m.ListPageModule
      ),
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/publications/detail/detail.module').then(
        (m) => m.DetailPageModule
      ),
    canActivate: [authGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
