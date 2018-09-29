import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    //{ path: 'login', loadChildren: './main/authentication/login-2/login-2.module#Login2Module' },
   // { path: '', redirectTo: 'pages', pathMatch: 'full' },
   // { path: '**', redirectTo: 'pages' },
  ];
  
  const config: ExtraOptions = {
    useHash: true,
  };
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }
  