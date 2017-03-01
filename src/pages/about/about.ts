import { AppandgoUser } from './../../providers/appandgo-user';
import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
   output={};
   connected=false;
   
   FB_APP_ID: number = 1368002846591785;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,private service:AppandgoUser) {
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
      env.service.facebookAuth(userId).subscribe(
        (resp)=>{
            alert(resp)
          });
      
      //Getting user information 
      Facebook.api("/me?fields=name,gender,age_range,first_name,last_name", params)
      .then(function(user) {
       
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
         alert(JSON.stringify(user));
          env.output=user;
          env.connected=true;
          
      })
      
      
    }, function(error){
      console.log(error);
    });
  }

  checkStatusChangeCallback(){
      alert('Checking the Status Changes');
  }
  disconnectFromFacebook(){
    let env=this;
    Facebook.logout().then(function(facebookDisconnectionResponse){
        alert('Disconnected User');
        alert(facebookDisconnectionResponse);
        env.connected=false;
    },function(error){
        alert(error);
    })
  }
  checkConnectivityState(){
    let env=this;
    Facebook.getLoginStatus().then(function(response) {
    env.statusChangeCallback(response);
    
    
  });
  }
  // This is called with the results from from Facebook.getLoginStatus().
   statusChangeCallback(response) {
    alert('statusChangeCallback');
    alert(JSON.stringify(response));
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for Facebook.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      alert('Already connected')
    alert('Fetching your information.... ');
    Facebook.api('/me',null).then((response)=> {
      console.log('Successful login for: ' + response.name)
      alert('Thanks for logging in, ' + response.name + '!')
    })
    alert('end of fetching ')

     // this.testAPI(this.Facebook);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
          alert('not_authorized')

    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
          alert('not_authorized')

    }
  }
   checkLoginState(Facebook) {
     let env=this;
    Facebook.getLoginStatus(function(response) {
      env.statusChangeCallback(response)
    });
  }


   
  
}
