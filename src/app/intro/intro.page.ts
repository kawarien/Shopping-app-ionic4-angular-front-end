import { Component, OnInit } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Utilisateur } from 'src/models/utilisateur-interface';
import { HttpClient } from '@angular/common/http';
import { environement } from 'src/models/environements';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  utilisateur = {} as Utilisateur;
 // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
 slideOpts = {
  initialSlide: 0,
  speed: 400
};

  constructor(
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    private http: HttpClient,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api('me?fields=email', [])
        .then(async profil => {
          const email: string = profil['email'];
          this.utilisateur = {
            contact: email,
            type: 'email',
            avatar: '',
            username: '',
          }
          await this.nativeStorage.setItem('Utilisateur', this.utilisateur);
          await this.nativeStorage.setItem('isLoggedIn', true);
              // stocker l'utilisateur dans mongodb
          const url = `${environement.api_url}/Utilisateurs`;
          this.http.post(url, this.utilisateur)
              .subscribe(user => {
                // navigate vers la page d'acceuil
                console.log('user', user);
                this.navCtrl.navigateForward('/home');

              })

        })
    })
      .catch(e => console.log('Error logging into Facebook', e));

  }

   loginWithPhone() {
    (<any> window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
      defaultCountryCode: 'FR',
      facebookNotificationsEnabled: true,
    },
    (success) =>{
      console.log('success', success);
      (<any> window).AccountKitPlugin.getAccount(
        async account => {
          console.log('Account', account);
          this.utilisateur = {
            contact: account.phoneNumber,
            type: 'phone',
            avatar: '',
            username: '',
          }
          await this.nativeStorage.setItem('Utilisateur', this.utilisateur);
          await this.nativeStorage.setItem('isLoggedIn', true);
              // stocker l'utilisateur dans mongodb
          const url = `${environement.api_url}/Utilisateurs`;
          this.http.post(url, this.utilisateur)
              .subscribe(user => {
                // navigate vers la page d'acceuil
                this.navCtrl.navigateForward('/home');
              })

        }, (fail => {
          console.log('fail', fail);
        }))
    }, (error => {
      console.log('error', error);

    }))

  }



}
