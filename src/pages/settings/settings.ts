import { Component, NgZone} from '@angular/core';
import { NavController,NavParams,AlertController} from 'ionic-angular';

import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';
import { ContactPage } from '../contact/contact';
import { AuthService } from '../../providers/auth-service';
import {productsPage} from '../products/products';
import { FormBuilder, Validators } from '@angular/forms';

const ShopStyle = require('shopstyle-sdk');
const shopstyle = new ShopStyle('uid8976-38160824-19');
@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class settingsPage {

//outfits:Array <any>;
public passwordForm;
brands: Array<any>;
brandsID: Array<any>;
changedPass:boolean;
type: any;
newPassword: string;
brandsList: any;
category: any;
username: any;
userID: any;
currentUser: any;
gender: string;
oldUsername: any;
usernameText: any;
mostPopList: Array<any>;
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController,private ngZone: NgZone,public af: AngularFire,private _auth: AuthService,private navParams:NavParams,public alertCtrl: AlertController,public formBuilder: FormBuilder) {
        const authObserver = af.auth.subscribe( user => {
          
  if (user) {
this.changedPass = false;
this.currentUser = user;
this.userID = user.uid;
this.update();
}
  this.passwordForm = formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
        )};

  showAlert() {
  
  }

  
 ngAfterViewInit() {
var userid = this.userID;
var ref = firebase.database().ref(userid+'/gender');
ref.once('value', (snapshot) => {

 if (snapshot.val() != null) {
  this.gender = snapshot.val();
}
else{

}
});


 }
 changeSelect(gender){
   var userid = this.userID;
var ref = firebase.database().ref(userid+'/gender');
ref.set(gender);
}
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

changePassword(newPass)
{
  if (!this.passwordForm.valid){
   let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'Passwords must be 6 or more characters',
      buttons: ['OK']
    });
    alert.present();

} else
{
 var changed = this._auth.updatePassword(newPass);
   let alert = this.alertCtrl.create({
      title: 'Sweet',
      subTitle: 'Password was updated successfully',
      buttons: ['OK']
    });
    alert.present();
}
}
update()
{

var ref = firebase.database().ref(this.userID+'/username');
ref.once('value', (snapshot) => {
  if (snapshot.val() === null) {

  }else{
   this.usernameText = snapshot.val();
   this.oldUsername = snapshot.val();
console.log(snapshot.val());
  }
});

  
}

changePosts(username){
  var user = this.userID;
   this.update();
       firebase.database().ref("outfits").once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
     
      
      var childData = childSnapshot.val();
 var postref = firebase.database().ref("/outfits/"+key+"/"+"username");

      if(childData.user == user)
      {
      
      postref.set(username);
      }
  }); 
  
});
}

  setDisplayname(newName)
  {
       if (/^[0-9A-Za-z]+$/.test(newName))
{
  console.log(this.oldUsername);
  console.log("old usernammae above: ");
var usernameRef = firebase.database().ref("/username/"+newName);
var oldnameref = firebase.database().ref("/username/"+this.oldUsername);
 oldnameref.set(null);

var ref = firebase.database().ref();
var q = ref.orderByChild('username').equalTo(newName);
q.once('value', (snapshot) => {

  if (snapshot.val() === null) {
   
       let alert = this.alertCtrl.create({
      title: 'Sweet',
      subTitle: 'Username was updated successfully',
      buttons: ['OK']
    });
    alert.present();

  

    // username does not yet exist, go ahead and add new user
     var db = firebase.database().ref(this.userID+'/username');

db.set(
  newName
);

usernameRef.set(this.userID);
this.changePosts(newName);

  } else {
    this.update();
      let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'Username already taken',
      buttons: ['OK']
     
    });
    alert.present();
  }
});
// Updates the user attributes:
}
else
{
          let alert = this.alertCtrl.create({
     title: 'Sorry',
      subTitle: 'Usernames can only contain alphanumeric characters',
      buttons: ['OK']
     
    });
    alert.present();
}

  }
}


