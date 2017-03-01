import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';
import {Restangular} from "ng2-restangular";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //for testing, we are using an initialized user cridentials (login & password)
  user = {email:'test@test.com',password:'test'};
  constructor(public navCtrl: NavController,private restangular:Restangular, public loading:LoadingController) {
    // GET http://api.test.local/v1/users/2/accounts
   
  }

  testLogin(){
    let loader = this.loading.create({
    content: 'Connecting...',
  });

    alert('You re about to connect now'+JSON.stringify(this.user));
    loader.present().then(()=>{
        let auth= this.restangular.allUrl('login');
        auth.post(this.user).subscribe(
          (resp)=>{
            console.log(resp);
            if(!resp.errors){
              alert(JSON.stringify(resp));
            }
          }
        );
        loader.dismiss();
    });
     
  }

}
