import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var M:any; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Users List';

  users: User[];
  userAux: User = {
    firstName: '',
    Lastname: '',
    email: '',
    username: '',
    userRol: '',
    userActive: '',
    editActive: true
  }

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    Lastname: new FormControl('', Validators.required),
    email: new FormControl(null, Validators.required),
    username: new FormControl('', Validators.required),
    userRol: new FormControl('', Validators.required),
    userActive: new FormControl('', Validators.required),

  });

  constructor(private db: AngularFireDatabase) {
    this.getUsers();

  }

  pushUser() {


    // otra manera de manejar las referencias 
    this.db.database.ref('users').push({
      firstName: '',
      Lastname: '',
      email: '',
      username: '',
      userRol: '',
      userActive: ''

    }).then(() => {
      console.log('User created');
    }).catch(e => {
      console.log(e);
    });


  }

  updateUser(uid: any) {

    // otra manera de manejar las referencias 
    this.db.database.ref('users/' + uid).update({
      firstName: this.form.value.firstName,
      Lastname: this.form.value.Lastname,
      email: this.form.value.email,
      username: this.form.value.username,
      userRol: this.form.value.userRol,
      userActive: this.form.value.userActive

    }).then(() => {
      console.log('User Uptated');
      this.form = new FormGroup({
        firstName: new FormControl('', Validators.required),
        Lastname: new FormControl('', Validators.required),
        email: new FormControl(null, Validators.required),
        username: new FormControl('', Validators.required),
        userRol: new FormControl('', Validators.required),
        userActive: new FormControl('', Validators.required),

      });;
    }).catch(e => {
      console.log(e);
    });



  }


  toast(message){
    M.toast({html: message, classes: 'rounded'});
  }



  removeUser(uid) {
    console.log("remove");
    this.db.object('users/' + uid).remove();

  }

  getUsers() {

    let refUsers: any;
    refUsers = this.db.object('users');
    refUsers.snapshotChanges().subscribe(action => {
      // console.log(action.type);
      // console.log(action.key)
      console.log('Real time', action.payload.val())

      this.users = [];
      for (let key in action.payload.val()) {
        let user = action.payload.val()[key];
        user.key = key;
        this.users.push(user);
      }
      console.log(this.users);



    });

  }

  getUser(uid) {

    let refUsers: any;
    refUsers = this.db.object('users/' + uid);
    refUsers.snapshotChanges().subscribe(action => {
      // console.log(action.type);
      // console.log(action.key)
      console.log('Real time', action.payload.val())
      console.log(this.form.value);
      let user = action.payload.val();

      this.form.controls['firstName'].setValue(user.firstName);
      this.form.controls['Lastname'].setValue(user.Lastname);
      this.form.controls['email'].setValue(user.email);
      this.form.controls['username'].setValue(user.username);
      this.form.controls['userRol'].setValue(user.userRol);
      this.form.controls['userActive'].setValue(user.userActive);

      
      
      
      
      
      

    });

  }

  closeAll(thisnot) {
    for (let index = 0; index < this.users.length; index++) {
      if (index != thisnot)
        this.users[index].editActive = false;
    }
  }

  sayHello() {
    console.log("Hello");
  }

  // npm install firebase @angular/fire

}




export interface User {
  firstName: string;
  Lastname: string;
  email: string;
  username: string;
  userRol: string;
  userActive: string;
  editActive: boolean;
  key?: string
}



// this.users=[
//   {
//     firstName:'Yecksin',
//     Lastname: 'Zuñiga',
//     email:'yecksin@gmail.com',
//     username:'yecksin',
//     userRol:'',
//     userActive:'',
//     editActive: false
//   },
//   {
//     firstName:'Sofia',
//     Lastname: 'Cruz',
//     email:'socruz@gmail.com',
//     username:'socruz',
//     userRol:'',
//     userActive:'',
//     editActive: false
//   },
//   {
//     firstName:'Zeus',
//     Lastname: 'Guerrero',
//     email:'zeus@gmail.com',
//     username:'zeus',
//     userRol:'',
//     userActive:'',
//     editActive: false
//   }
// ]