import { Component, OnInit } from '@angular/core';
import { Article, Availability } from 'src/models/article-interface';
import { categories } from 'src/models/category';
import { cities } from 'src/models/cities';
import { ActionSheetController } from '@ionic/angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  article: Article;
  categories;
  cities;
  myPictures: any [] = [];

  constructor(
    private actionSheet: ActionSheetController,
    private imagePicker: ImagePicker
  ) {
    this.article = {} as Article;
    this.article.availability = {} as Availability;
    this.article.pictures = [];
    this.categories = categories;
    this.cities = cities;
  }

  ngOnInit() {
  }

  create() {
    this.article.availability.available = true;
    console.log('article', this.article);
  }

  async galerie(imageNumber: number) {
    const options: ImagePickerOptions = {
      maximumImagesCount: imageNumber,
      outputType: 0,
      quality: 100,

    };

    return this.imagePicker.getPictures(options);
  }

  async action() {
    const actionSheet = await this.actionSheet.create({
      header: 'selectionner la source',
      buttons: [
        {
          text: 'Galerie',
          icon: 'images',
          handler: async () => {
            console.log('Galerie');
            const pictures: any [] = await this.galerie(4);
            for (let i = 0; i < pictures.length; i++ ) {
              const element = pictures[i];
              console.log('element de pictures', element);
              this.myPictures.push(element);

            }

          }
        },

        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            console.log('Camera');
          }
        },

        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel'
        }

      ]

    });
    actionSheet.present();
  }

  delete(picture, i) {

  }

}
