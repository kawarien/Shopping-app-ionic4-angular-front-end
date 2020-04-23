import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitDetailPageRoutingModule } from './produit-detail-routing.module';

import { ProduitDetailPage } from './produit-detail.page';
import { IonicRatingModule } from "ionic4-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitDetailPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [ProduitDetailPage]
})
export class ProduitDetailPageModule {}
