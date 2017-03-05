import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import {AppandgoUser} from '../../providers/appandgo-user';
import {Facebook} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user ={};
  error='';
  constructor(public navCtrl: NavController, private appAndGoUserService:AppandgoUser,public toastCtrl: ToastController) {

  }

  auth(){
      this.appAndGoUserService.auth(this.user).subscribe(
      (resp)=>{
        alert(JSON.stringify(resp));
        if(!resp.errors){
          this.presentToast();
        }
      });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was connected successfully',
      duration: 3000
    });
    toast.present();
  }

}
