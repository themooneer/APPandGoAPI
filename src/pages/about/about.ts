import { Component } from '@angular/core';
import { Facebook } from 'ionic-native';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public navCtrl: NavController) {

alert("On se connecte à facebook")

    Facebook.login(["public_profile"]).then((FacebookLoginResponse) =>{
      alert(FacebookLoginResponse.status);
      alert(JSON.stringify(FacebookLoginResponse) );
    }).catch((FacebookLoginResponse) =>{
      alert(JSON.stringify(FacebookLoginResponse) );

    })

  // This is called with the results from from Facebook.getLoginStatus().
  function statusChangeCallback(response) {
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
    this.Facebook.api('/me').then((response)=> {
      console.log('Successful login for: ' + response.name)
      alert('Thanks for logging in, ' + response.name + '!')
    })
    alert('end of fetching ')

      this.testAPI(this.Facebook);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
          alert('not_authorized')

    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
          alert('not_authorized')

    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState(Facebook) {
    this.Facebook.getLoginStatus(function(response) {
      statusChangeCallback(response)
    });
  }


  Facebook.getLoginStatus().then(function(response) {
    statusChangeCallback(response);
  });

  Facebook.logout().then((response)=>{
    alert(JSON.stringify(response));
    alert("On est deconnecté");

  }).catch((response)=>{
    alert(JSON.stringify(response));
  })

checkLoginState(Facebook)






  }


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI(Facebook) {
    console.log('Welcome!  Fetching your information.... ');
    Facebook.api('/me').then((response)=> {
      console.log('Successful login for: ' + response.name);
      alert('Thanks for logging in, ' + response.name + '!')
    }

    );
  }

/*  Below we include the Login Button social plugin. This button uses
  the JavaScript SDK to present a graphical Login button that triggers
  the Facebook.login() function when clicked.
*/





/*
    let login = Facebook.login(["public_profile"]).then((FacebookLoginResponse) =>{
          
      if (FacebookLoginResponse.status === 'connected') {
        // Logged into your app and Facebook.
      } else if (FacebookLoginResponse.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }

    }).catch((FacebookLoginResponse) =>{
      alert(JSON.stringify(FacebookLoginResponse) );

    })


    Facebook.login(["public_profile"]).then((FacebookLoginResponse) =>{
      alert(FacebookLoginResponse.status);
      alert(JSON.stringify(FacebookLoginResponse) );
    }).catch((FacebookLoginResponse) =>{
      alert(JSON.stringify(FacebookLoginResponse) );

    })

    */
    




}
