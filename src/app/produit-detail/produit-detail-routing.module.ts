import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitDetailPage } from './produit-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitDetailPageRoutingModule {}
