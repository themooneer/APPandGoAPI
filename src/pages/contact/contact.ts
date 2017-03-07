import { APIService } from './../../providers/api-service';
import { Component } from '@angular/core';

import { NavController,LoadingController} from 'ionic-angular';
import {Restangular} from "ng2-restangular";
import {AclService} from "angular2-acl";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //for testing, we are using an initialized user cridentials (login & password)
  user = {email:'test@test.com',password:'test'};
  constructor(public navCtrl: NavController,private API:APIService, public loading:LoadingController,private aclService:AclService) { 
    
  }

  testLogin(){
    let loader = this.loading.create({
    content: 'Connecting...',
  });

    alert('You re about to connect now'+JSON.stringify(this.user));
    loader.present().then(()=>{
        let auth= this.API.all('auth').all('login');
        auth.post(this.user).subscribe(
          (resp)=>{
            alert(JSON.stringify(resp));
            if(!resp.errors){
              alert('Click ok to get roles');
              alert(JSON.stringify(resp.data.user.roles));
              alert('Click ok to get your permissions');
              alert(JSON.stringify(resp.data.abilities)); 
              //Storing abilities and roles to AclService
              this.setAbilitiesAndRolesToAcl(resp.data.abilities,resp.data.user.roles);
            }
          }
        );
        loader.dismiss();
    });
     
  }
  //This function will store Abilities and Roles to AclService
  setAbilitiesAndRolesToAcl(abilities,roles){
    //setting abilities to AclService
    this.aclService.setAbilities(abilities);
    //fetching and attaching all user roles to AclService
    roles.forEach(role => {
                console.log(role);
                this.aclService.attachRole(role);
    });
  }

  //Getting user Aibilities and Roles from AclService
  getAclServiceInfo(){
    console.log(JSON.stringify(this.aclService.data.roles));
  }

}
