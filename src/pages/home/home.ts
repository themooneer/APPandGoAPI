import { AclService } from 'angular2-acl';
import { APIService } from './../../providers/api-service';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import {AppandgoUser} from '../../providers/appandgo-user';
import {Facebook} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user ={};
  userinfo={};
  error='';
  connected=false;
  constructor(public navCtrl: NavController, private appAndGoUserService:AppandgoUser,public toastCtrl: ToastController,private API:APIService,public aclService:AclService, public loader:LoadingController) {

  }

  auth(){
      //showing Loader 
      let loading=this.loader.create({
        content:'Connexion en cours ...'
      });
      loading.present().then(()=>{
         let auth= this.API.all('auth').all('login');
        auth.post(this.user).subscribe(
          (resp)=>{
            if(!resp.errors){
              this.connected=true;
              this.userinfo=resp.data.user;
            // console.log(JSON.stringify(resp.data));
              //console.log('Click ok to get roles');
             // console.log(JSON.stringify(resp.data.user.roles));
              console.log('Click ok to get your permissions');
              console.log(JSON.stringify(resp.data.abilities)); 
              //Storing abilities and roles to AclService
              this.setAbilitiesAndRolesToAcl(resp.data.abilities,resp.data.userRole);
            }else{
              this.error='Email ou mot de passe sont incorrectes';
            }
          }
        );
        loading.dismiss();
      });
  }
  logout(){
    this.connected=false;
    this.aclService.data.roles=[];
    this.aclService.data.abilities=[];

  }
  //This function will store Abilities and Roles to AclService
  setAbilitiesAndRolesToAcl(abilities,roles){
    //setting abilities to AclService
    this.aclService.setAbilities(abilities);
    //fetching and attaching all user roles to AclService
    roles.forEach(role => {
                console.log(role);
                this.aclService.attachRole(role);
                console.log(this.aclService.getRoleAbilities(role));
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
