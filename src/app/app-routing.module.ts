import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'model',
    loadChildren: () => import('./model/model.module').then( m => m.ModelPageModule)
  },
  {
    path: 'year',
    loadChildren: () => import('./year/year.module').then( m => m.YearPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'submodel',
    loadChildren: () => import('./submodel/submodel.module').then( m => m.SubmodelPageModule)
  },
  {
    path: 'remotedetails',
    loadChildren: () => import('./remotedetails/remotedetails.module').then( m => m.RemotedetailsPageModule)
  },
  {
    path: 'addremote',
    loadChildren: () => import('./addremote/addremote.module').then( m => m.AddremotePageModule)
  },
  {
    path: 'addmodel',
    loadChildren: () => import('./addmodel/addmodel.module').then( m => m.AddmodelPageModule)
  },
  {
    path: 'addcardetails',
    loadChildren: () => import('./addcardetails/addcardetails.module').then( m => m.AddcardetailsPageModule)
  },
  {
    path: 'addcarbrand',
    loadChildren: () => import('./addcarbrand/addcarbrand.module').then( m => m.AddcarbrandPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
