import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { categories } from 'src/models/category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  categories: any[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: NativeStorage,
    private route: Router,
    private navCtrl: NavController
  ) {
    this.categories = categories;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const loggedIn = await this.storage.getItem('isLoggedIn');
      this.statusBar.styleDefault();
      if (loggedIn) {
        console.log('Déjà connecté');
        this.navCtrl.navigateRoot('/home');
      }
      this.splashScreen.hide();
    });
  }

  showCategory(catTitle: string) {
    this.navCtrl.navigateForward('/category/' + catTitle);
    console.log('catTitle', catTitle);

  }

  goTo(route: string) {
    console.log('route', route);
    this.navCtrl.navigateForward(`/${route}`);

  }
}
