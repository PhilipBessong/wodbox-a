import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./users/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'chome',
    loadChildren: () => import('./home/chome/chome.module').then( m => m.ChomePageModule)
  },
  {
    path: 'ahome',
    loadChildren: () => import('./home/ahome/ahome.module').then( m => m.AhomePageModule)
  },  {
    path: 'forgot-password',
    loadChildren: () => import('./users/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./admin/adduser/adduser.module').then( m => m.AdduserPageModule)
  },
  {
    path: 'addwod',
    loadChildren: () => import('./admin/addwod/addwod.module').then( m => m.AddwodPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
