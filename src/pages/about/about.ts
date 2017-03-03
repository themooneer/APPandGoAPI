import { Restangular } from 'ng2-restangular';
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
   inputValue ={};
   FB_APP_ID: number = 1368002846591785;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,private service:AppandgoUser,private restAngularService:Restangular) {
        Facebook.browserInit(this.FB_APP_ID);
        
  }
  // 
  connectFacebook(){
    //check if the user has already logged in
        this.checkConnectivityState();
        if(!this.connected){
            //Connexion à Facebook
            let permissions = new Array();
            //the permissions your facebook app needs from the user
            permissions = ["public_profile"];
            Facebook.login(permissions)
            .then((response)=>{
              alert("**ACCESS TOKEN =**"+JSON.stringify(response.authResponse.accessToken));
              let userId = response.authResponse.userID;
              let accessToken=response.authResponse.accessToken;
              let params = new Array();
              //Getting user information 
              Facebook.api("/me?fields=name,gender,age_range,first_name,last_name", params)
              .then((user) =>{
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                alert(JSON.stringify(user));
                  
                  this.inputValue=response.authResponse.accessToken;
                  this.connected=true;
                 // let authParams={provider:'facebook',oauthUser:user}
                  // alert("PROVIDER ID SENT TO API"+JSON.stringify(user));
                  let callback=this.restAngularService.one('facebook',accessToken);
                  //alert(JSON.stringify(callback));
                  callback.get().subscribe(
                    (callbackResponse)=>{
                      alert(JSON.stringify(callbackResponse.data));
                      this.output=callbackResponse.data;
                      /*if(!callbackResponse.errors){
                          //alert('Laravel conn');
                          alert(JSON.stringify(callbackResponse.data));
                         
                      }*/
                     
                    }
                  );
                 
                  
                  /*
                  In case of need these code below will use a post method to send OauthProviderId and the provider to the api
                  this.service.facebookAuthPOSTHttp(user.id).subscribe(
                      (resp)=>{
                          alert(JSON.stringify(resp));
                      });
                  */                  
              })
              
              
            }, (error)=>{
              console.log(error);
            });
        }
    
  }
  connectFacebookAPI(){
      //This method will allow us to connect using Facebook Oauth via Laravel API 
      //First of all we have to use a local Restangular var to handle our post request to /api/auth/{profider}
     let auth = this.restAngularService.allUrl('facebook');
     auth.post(null).subscribe(
       (resp)=>{
         alert(resp);
       }
     );
     
      
  }

  checkStatusChangeCallback(){
      alert('Checking the Status Changes');
  }
  disconnectFromFacebook(){
    Facebook.logout().then((facebookDisconnectionResponse)=>{
        alert('Disconnected User');
        alert(facebookDisconnectionResponse);
        this.connected=false;
    },(error)=>{
        alert(error);
    })
  }
  checkConnectivityState(){
    Facebook.getLoginStatus().then((response)=> {
    this.statusChangeCallback(response);
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
      this.connected=true;
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
          alert('not_authorized');
          this.connected=false;

    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
          alert('not_authorized');
          this.connected=false;

    }
  }
   checkLoginState(Facebook) {
   
      Facebook.getLoginStatus(
        (response)=> {
        this.statusChangeCallback(response)
      }
      );
  }


   
  
}
