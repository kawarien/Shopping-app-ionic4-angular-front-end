import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/models/environements';
import { Article } from 'src/models/article-interface';
import { Observable } from 'rxjs';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  articles: Article[];


  constructor(
    private http: HttpClient,
    private photoViewer: PhotoViewer,
    private navCtrl: NavController
    ) {
      //this.loadArticles();
      this.loadData();

    }

    ngOnInit() {
      this.loadData()
      .subscribe((data: Article[]) => {
        console.log('articles', data);
        this.articles = data;
      });

    }

    loadData(): Observable<Article[]> {
      const url = `${environement.api_url}/Articles`;
      return this.http.get<Article[]>(url);
    }

    doRefresh($event) {
      this.loadData()
      .subscribe((data: Article[]) => {
        console.log('articles provenant de doRefresh', data);
        this.articles = data;
      });

      $event.target.complete();

    }

    showImage(imgId: string, imgTitle: string, event) {
      event.stopPropagation();
      this.photoViewer.show(`http://localhost:3000/Containers/photos/download/${imgId}`,
      imgTitle, {share: true});


    }

    showDetails(id: string) {
      this.navCtrl.navigateForward('/produit-detail/' + id);

    }

    onSearch(event) {
      const value: string = event.target.value;
      if (value) {
        this.articles = this.articles.filter((article)=>{
          return article.title.toLowerCase().includes(value.toLowerCase());
        })
      }

    }

    onCancel(event) {
      this.loadData()
      .subscribe((data: Article[]) => {
        console.log('articles provenant de doRefresh', data);
        this.articles = data;
      });
    }

    goToCreate() {
      this.navCtrl.navigateForward('/create-product');
    }


  // loadArticles() {
  //   const url = `${environement.api_url}/Articles`;
  //   console.log('url', url);
  //   this.http.get(url)
  //   .subscribe(articles =>
  //     console.log('articles', articles));
  // }

  // insertArticle() {
  //   const usrl = `${environement.api_url}/Articles`;
  //   this.http.post(usrl, {nom: this.nom, description: this.description})
  //   .subscribe(results => console.log('result', results));
  // }

  // updateArticle() {
  //   const id = '5dfacf115c259e5df409cd06';
  //   const usrl = `${environement.api_url}/Articles/${id}`;
  //   this.http.patch(usrl, {nom: 'Montre (Updated)'})
  //   .subscribe(results => console.log('result', results));
  // }

  // removeArticle() {
  //   const id = '5dfe7325636f033200a773ef';
  //   const usrl = `${environement.api_url}/Articles/${id}`;
  //   this.http.delete(usrl)
  //   .subscribe(results => console.log('result', results));
  // }

}
