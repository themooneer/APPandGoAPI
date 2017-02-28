import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppandgoUser} from '../../providers/appandgo-user';
/*
  Generated class for the Authentification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html'
})
export class AuthentificationPage {
  user ={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private appAndGoUserService:AppandgoUser) {

    this.appAndGoUserService.auth(this.user).subscribe(
    (resp)=>{
      console.log(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');

  }

}
