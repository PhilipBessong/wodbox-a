import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  },
  {
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
  },
  {
    path: 'wodinfo/:id',
    loadChildren: () => import('./admin/wodinfo/wodinfo.module').then( m => m.WodinfoPageModule)
  },
  {
    path: 'warmup',
    loadChildren: () => import('./client/warmup/warmup.module').then( m => m.WarmupPageModule)
  },
  {
    path: 'wod',
    loadChildren: () => import('./client/wod/wod.module').then( m => m.WodPageModule)
  },
  {
    path: 'wodgo',
    loadChildren: () => import('./client/wodgo/wodgo.module').then( m => m.WodgoPageModule)
  },
  {
    path: 'wodon',
    loadChildren: () => import('./client/wodon/wodon.module').then( m => m.WodonPageModule)
  },
  {
    path: 'wodstyle',
    loadChildren: () => import('./admin/wodstyle/wodstyle.module').then( m => m.WodstylePageModule)
  },
  {
    path: 'tabata',
    loadChildren: () => import('./admin/tabata/tabata.module').then( m => m.TabataPageModule)
  },
  {
    path: 'ladder',
    loadChildren: () => import('./admin/ladder/ladder.module').then( m => m.LadderPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
