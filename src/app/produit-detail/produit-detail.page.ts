import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environement } from 'src/models/environements';
import { Observable } from 'rxjs';
import { Article } from 'src/models/article-interface';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { itemCart } from 'src/models/itemCart-interface';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.page.html',
  styleUrls: ['./produit-detail.page.scss'],
})
export class ProduitDetailPage implements OnInit {
slidesOpt = {
  speed: 1000,
  autoplay: {
    delay: 500
  }
};
article: Article;
rate: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private photoViewer: PhotoViewer,
    private router: Router,
    private toastCtrl: ToastController,
    private storage: NativeStorage) { }

  ngOnInit() {
    const id: string = this.activateRoute.snapshot.paramMap.get('id');
    console.log('id', id);
    this.loadData(id).subscribe((data) => {
      this.article = data;
      console.log(this.article);
    });
  }

  loadData(id: string): Observable<Article> {
    const url = `${environement.api_url}/Articles/${id}`;
    return this.http.get<Article>(url);
  }

  showImage(imgId: string, imgTitle: string) {
    this.photoViewer.show(`http://localhost:3000/Containers/photos/download/${imgId}`,
    imgTitle, {share: true});
  }

  leaveNote() {
    console.log('rate', this.rate);
    const average: number = (this.article.averageStar + this.rate) / 2;
    const arondi: number = Math.ceil(average);
    const utilisateurId = this.article.utilisateurId;
    const articleId = this.article.id;
    const url = `${environement.api_url}/Utilisateurs/${utilisateurId}/Articles/${articleId}`;
    console.log('url', url);

    this.http.put(url, {averageStar: arondi})
    .subscribe(res => {
      this.presentToast('votre note a réussi', 2000);
    });
  }

  openCart() {
    this.router.navigateByUrl('cart');
  }

  async addToCart(item: Article) {
    try {
      let added = false;
      let data: itemCart[];
      data = await this.storage.getItem('Cart');
      console.log('data', data);
      
      // on verifier si le  panier est vide
      if (data === null || data.length === 0) {
        data.push({
          item,
          qty: 1,
          amount: item.price
        });
        // si  le  panier n'est pas vide
      } else {
        for(let i = 0; i < data.length; i++) {
          const element: itemCart = data[i];
          if (item.id === element.item.id) {
            // le panier  contient deja  cette article
            element.qty += 1;
            element.amount += item.price;
            added = true;
          }
        }
      }
      if (!added) {
        data.push({
          item,
          qty: 1,
          amount: item.price
        });
      }
      // mettre a  jours le sto*ckage  interne
      await this.storage.setItem('cart', data);
      this.presentToast('Votre Panier a été  mis à jours', 1500);
    } catch (e) {

      const myData: itemCart[] = [];
      console.log('erreur', e);
      if (e.code === 2 ) {
          myData.push({
          item,
          qty: 1,
          amount: item.price,
        });
          await  this.storage.setItem('cart', myData);
          this.presentToast('Votre Panier à été mis a jours', 1500);
      }
   }
  }


  onModelChange($event) {

  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration
    });

    toast.present();
  }



}
