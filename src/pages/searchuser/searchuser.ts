import { Component, NgZone} from '@angular/core';
import { NavController,NavParams,AlertController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';
import { ContactPage } from '../contact/contact';
import { AuthService } from '../../providers/auth-service';
import {profilePage} from '../profile/profile';
import {productsPage} from '../products/products';
import { FormBuilder, Validators } from '@angular/forms';

const ShopStyle = require('shopstyle-sdk');
const shopstyle = new ShopStyle('uid8976-38160824-19');
@Component({
  selector: 'searchuser',
  templateUrl: 'searchuser.html'
})
export class searchuserPage {

//outfits:Array <any>;

following: Array<any>;
originalFollowing: Array<any>;
allUsers: Array<any>;
searchedUser: any;
followingID: Array<any>;
brands: Array<any>;
brandsID: Array<any>;
changedPass:boolean;
type: any;
newPassword: string;
brandsList: any;
category: any;
username: any;
myUser: any;
currentUser: any;
searchQuery: string = '';
usernameText: string;
mostPopList: Array<any>;
  submitAttempt: boolean = false;
  constructor(public navCtrl: NavController,private ngZone: NgZone,public af: AngularFire,private _auth: AuthService,private navParams:NavParams,public alertCtrl: AlertController,public formBuilder: FormBuilder) {
        const authObserver = af.auth.subscribe( user => {
          
  if (user) {
 this.myUser = user.uid;


}

  }
        )};

printKey(key){
    var index = this.following.indexOf(key);
    var id = this.followingID[index];
    this.navCtrl.push(profilePage, { "user": id});
  
}
  
 ngAfterViewInit() {

var temp = [];
var tempID = [];
firebase.database().ref(this.myUser+'/following/').on('child_added', function(data) {
var element = data.val();
var id = data.key;

temp.push(element);
tempID.push(id);

});
this.following = temp;
this.originalFollowing = temp;
this.followingID = tempID;

firebase.database().ref(this.myUser+'/following/').on('child_removed', function(data) {
var element = data.val();
var id = data.key;
if(element){
var index1 = temp.indexOf(element);
if (index1 > -1) {
    temp.splice(index1, 1);
}
var index2 = temp.indexOf(id);
if (index2 > -1) {
    tempID.splice(index2, 1);
}

}
});
this.following = temp;
this.originalFollowing = temp;
this.followingID = tempID;
 }
 initializeItems()
 {
this.following = this.originalFollowing;
 }
 getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.following = this.following.filter((item) => {

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    }
  }


 


}


