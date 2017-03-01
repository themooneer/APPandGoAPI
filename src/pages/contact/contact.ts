import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Restangular} from "ng2-restangular";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,private restangular:Restangular) {
    // GET http://api.test.local/v1/users/2/accounts
    this.restangular.one('users', 2).all('accounts').getList();
  
  }

}
