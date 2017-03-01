import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
   output="Stand by";
   
   FB_APP_ID: number = 1368002846591785;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController) {
        Facebook.browserInit(this.FB_APP_ID);
  }
  // 
  connectFacebook(){
    //Connexion à Facebook
    let permissions = new Array();
    //let nav = this.navCtrl;
    let env =this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];
    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();
      
      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
       
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
         alert(JSON.stringify(user));
          env.output=JSON.stringify(user);
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          //nav.push(HomePage);
          this.log(user);
         
        }, function (error) {
          console.log(error);
        });
      })
      
      
    }, function(error){
      console.log(error);
    });
  }
   
  
}
