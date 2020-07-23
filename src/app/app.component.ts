import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var M:any; 
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UL';
  // true when the database load all the users
  ListIsLoad = false;
  // es para almacenar todos los usuarios en la memoria
  users: User[];
  // used of have a user in memory
  userAux: User = {
    firstName: '',
    Lastname: '',
    email: '',
    username: '',
    userRol1: '',
    userRol2: '',
    userRol3: '',
    userActive: '',
    editActive: true
  }
  //form
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    email: new FormControl(null, Validators.required),
    username: new FormControl('', Validators.required),
    userRol1: new FormControl(''),
    userRol2: new FormControl(''),
    userRol3: new FormControl(''),
    userActive: new FormControl(''),

  });

  constructor(private db: AngularFireDatabase) {
  
  // init modal of materialize
  $(document).ready(function(){
    $('.modal').modal();
  });

  // get users when de page is load
  this.getUsers();

  }
  // push only one user from the database
  pushUser() {

    this.db.database.ref('users').push({
      firstName: '',
      Lastname: '',
      email: '',
      username: '',
      userRol1: '',
      userRol2: '',
      userRol3: '',
      userActive: ''

    }).then(() => {
      this.toast('User added successfully');
    }).catch(e => {
      console.log(e);
    });


  }
  // update only one user from the database
  updateUser(uid: any) {

    this.db.database.ref('users/' + uid).update({
      firstName: this.form.value.firstName,
      Lastname: this.form.value.Lastname,
      email: this.form.value.email,
      username: this.form.value.username,
      userRol1: this.form.value.userRol1,
      userRol2: this.form.value.userRol2,
      userRol3: this.form.value.userRol3,
      userActive: this.form.value.userActive

    }).then(() => {
      this.toast('User '+this.form.value.firstName+ ''+this.form.value.Lastname +' uptated successfully');
      this.form = new FormGroup({
        firstName: new FormControl('', Validators.required),
        Lastname: new FormControl('', Validators.required),
        email: new FormControl(null, Validators.required),
        username: new FormControl('', Validators.required),
        userRol1: new FormControl(''),
        userRol2: new FormControl(''),
        userRol3: new FormControl(''),
        userActive: new FormControl(''),

      });;
    }).catch(e => {
      console.log(e);
    });



  }
   // remove only one user from the database
  removeUser(uid:any) {
    this.db.object('users/' + uid).remove();
    this.toast('User removed successfully');
  
  }
  // returns users from the database
  getUsers() {

    let refUsers: any;
    refUsers = this.db.object('users');
    refUsers.snapshotChanges().subscribe(action => {
      this.users = [];
      for (let key in action.payload.val()) {
        let user = action.payload.val()[key];
        user.key = key;
        this.users.push(user);
      }
      this.ListIsLoad = true;


    });

  }
  
  // returns only one user from the database
  getUser(uid:any) {

    let refUsers: any;
    refUsers = this.db.object('users/' + uid);
    refUsers.snapshotChanges().subscribe(action => {
      let user = action.payload.val();
      this.form.controls['firstName'].setValue(user.firstName);
      this.form.controls['Lastname'].setValue(user.Lastname);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['username'].setValue(user.username);
      this.form.controls['userRol1'].setValue(user.userRol1);
      this.form.controls['userRol2'].setValue(user.userRol2);
      this.form.controls['userRol3'].setValue(user.userRol3);
      this.form.controls['userActive'].setValue(user.userActive);

    });

  }
  
  // used to minimize forms
  closeAll(thisnot:any) {
    for (let index = 0; index < this.users.length; index++) {
      if (index != thisnot)
        this.users[index].editActive = false;
    }
  }
  // is used to give feedback to the user
  toast(message:any){
    M.toast({html: message, classes: 'rounded'});
  }
}



// Interface for user 
export interface User {
  firstName: string;
  Lastname: string;
  email: string;
  username: string;
  userRol1: string;
  userRol2: string;
  userRol3: string;
  userActive: string;
  editActive: boolean;
  key?: string
}

