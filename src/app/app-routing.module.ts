import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'intro', loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)},
  {
    path: 'category/:catTitle',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'messagerie',
    loadChildren: () => import('./messagerie/messagerie.module').then( m => m.MessageriePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'produit-detail/:id',
    loadChildren: () => import('./produit-detail/produit-detail.module').then( m => m.ProduitDetailPageModule)
  },
  {
    path: 'create-product',
    loadChildren: () => import('./create-product/create-product.module').then( m => m.CreateProductPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
