import { Component, OnInit } from '@angular/core';
import { environement } from 'src/models/environements';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/models/article-interface';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  catTitle: string;
  articles: Article[];
  url: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private photoViewer: PhotoViewer,
    private navCtrl: NavController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    this.catTitle = this.activateRoute.snapshot.paramMap.get('catTitle');
    console.log('catTitle', this.catTitle);
    this.url = `${environement.api_url}/Articles?filter=%7B"where"%3A%7B"category"%3A"${this.catTitle}"%7D%7D`;
    console.log('url', this.url);

    this.loadData(this.url)
    .subscribe((data: Article[]) => {
      console.log('articles', data);
      this.articles = data;

      if (data.length === 0) {
        this.presentToast('Pas d article pour cette categorie pour le moment', 2000);
      }
    });


  }

  loadData(url: string): Observable<Article[]> {
    return this.http.get<Article[]>(url);
  }

  doRefresh($event) {
    this.loadData(this.url)
    .subscribe((data: Article[]) => {
      console.log('articles provenant de doRefresh', data);
      this.articles = data;
    });

    $event.target.complete();

  }

  showImage(imgId: string, imgTitle: string, event) {
    event.stopPropagation();
    this.photoViewer.show(`http://localhost:3000/Containers/photos/download/${imgId}`, imgTitle, {share: true});


  }

  showDetails(id: string) {
    this.navCtrl.navigateForward('/produit-detail/' + id);

  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration
    });

    toast.present();
  }

}
