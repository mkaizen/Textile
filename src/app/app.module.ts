import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { OutfitsPage } from '../pages/outfits/outfits';
import { ContactPage } from '../pages/contact/contact';
import { closetMenuPage } from '../pages/closetMenu/closetMenu';
import { brandsPage } from '../pages/brands/brands';
import { profileFollowPage } from '../pages/profilefollow/profilefollow';
import { searchproductsPage } from '../pages/searchproducts/searchproducts';
import { feedPage } from '../pages/feed/feed';
import { listviewPage } from '../pages/listview/listview';
import { searchuserPage } from '../pages/searchuser/searchuser';
import { followingPage } from '../pages/following/following';
import { PopoverContentPage } from '../pages/contact/popover';
import { HomePage,imagePicker } from '../pages/home/home';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginPage } from '../pages/login/login';
import {profilePage} from '../pages/profile/profile';
import { productsPage } from '../pages/products/products';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { AuthService } from '../providers/auth-service';
import { settingsPage } from '../pages/settings/settings';
import * as firebase from 'firebase';
import { ShareService } from '../providers/ShareService';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SwingModule } from 'angular2-swing';
import { ImageCropperComponent } from'../pages/cropper/img-cropper';
import { Push } from '@ionic-native/push';

export const firebaseConfig = {
    apiKey: "AIzaSyCbJvS86BwyrrfTy3lwJ71tt0zkoTz6wRU",
    authDomain: "streetwear-3906e.firebaseapp.com",
    databaseURL: "https://streetwear-3906e.firebaseio.com",
    storageBucket: "streetwear-3906e.appspot.com",
    messagingSenderId: "307268348961"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3a4b03cd'
  }, 'push': {
    'sender_id': '307268348961',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
      }
    }
  }

};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    OutfitsPage,
    ContactPage,
    HomePage,
    searchproductsPage,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    imagePicker,
    closetMenuPage,
    profilePage,
    brandsPage,
    profileFollowPage,
    followingPage,
    searchuserPage,
    productsPage,
    feedPage,
    listviewPage,
    settingsPage,
    ImageCropperComponent,

    PopoverContentPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
     
    }, {}
  ),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
     SwingModule,CloudModule.forRoot(cloudSettings)
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OutfitsPage,
    ContactPage,
    searchproductsPage,
    HomePage,
    imagePicker,
    closetMenuPage,
    brandsPage,
    followingPage,
    searchuserPage,
    productsPage,
    profileFollowPage,
    listviewPage,
    profilePage,
    feedPage,
    settingsPage,
    
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    ImageCropperComponent,
    PopoverContentPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,ShareService,Push
  ],
})
export class AppModule {}
