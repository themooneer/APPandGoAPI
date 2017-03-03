import { APIService } from './../providers/api-service';
import { Observable } from 'rxjs/Rx';
import { AclService } from 'angular2-acl';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AppandgoUser} from '../providers/appandgo-user';
import { RestangularModule } from 'ng2-restangular';
import { Storage } from '@ionic/storage';
// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://appandgo-mounir-customadmin.herokuapp.com/api/auth/');
  RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json','Accept': 'application/x.laravel.v1+json'});
  
  // This function must return observable
  var refreshAccesstoken = function () {
    // Here you can make action before repeated request
    return Observable.of(true)
  };
  
  RestangularProvider.setErrorInterceptor(function (response) {
          if (response.status === 422) {
            // for (var error in response.data.errors) {
            // return ToastService.error(response.data.errors[error][0])
            // }
          }
        });
  RestangularProvider.addFullRequestInterceptor((element, operation, what, url, headers)=> {
          this.localStorage.get('satellizer_token').then((val)=>{
              var token = val;
               if (token) {
                headers.Authorization = 'Bearer ' + token
               }
          });

         
        })

  //The responseInterceptor is called after we get each response from the server
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response)=> {
       return data;
     });

  
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
      RestangularModule.forRoot(APIService.RestangularConfigFactory)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},AppandgoUser,AclService,Storage,APIService]
})
export class AppModule {}
