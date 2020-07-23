import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Users List';

  users:User[];
  userAux:User={
    firstName:'',
    Lastname: '',
    email:'',
    username:'',
    userRol:'',
    userActive:'',
    editActive: true
  }

  constructor(){
    this.getUserts();
  }

  pushUser(){
    this.users.push(
      {
        firstName:'',
        Lastname: '',
        email:'',
        username:'',
        userRol:'',
        userActive:'',
        editActive: true
      }
    );
    console.log(this.users);
  }
  updateUser(index){

  }

  removeUser(){

  }

  getUserts(){
   this.users=[
      {
        firstName:'Yecksin',
        Lastname: 'Zuñiga',
        email:'yecksin@gmail.com',
        username:'yecksin',
        userRol:'',
        userActive:'',
        editActive: false
      },
      {
        firstName:'Sofia',
        Lastname: 'Cruz',
        email:'socruz@gmail.com',
        username:'socruz',
        userRol:'',
        userActive:'',
        editActive: false
      },
      {
        firstName:'Zeus',
        Lastname: 'Guerrero',
        email:'zeus@gmail.com',
        username:'zeus',
        userRol:'',
        userActive:'',
        editActive: false
      }
    ]
  }

  closeAll(thisnot){
    for (let index = 0; index < this.users.length; index++) {
      if(index != thisnot )
      this.users[index].editActive=false;  
    }
  }

  sayHello(){
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
}
