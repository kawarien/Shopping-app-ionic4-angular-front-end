import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IntroPageModule } from './intro/intro.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IntroPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    NativeStorage,
    ImagePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
