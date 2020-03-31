// import logo from './logo.svg';
import { setServers } from "dns";
// import { userInfo } from 'os';
// import { stringify } from 'querystring';
import {observable, computed} from 'mobx';  

export interface User {
    id: number;
    name: string;
    surname: string;
    age: number;
  }
class Users {
    @observable arr = [ 
            {id: 1, name: 'Tanya', surname: 'Baikova', age: 18}, 
            {id: 2, name: 'Pasha', surname: 'Sukhov',  age: 16}
        ];
    @observable edit = false;
    deleteUser(id: number) {
        this.edit = false;
        this.arr = this.arr.filter(el=> el.id !== id);
    }
    editUser(user: User) {  
        this.arr = this.arr.map((el => el.id===user.id ? el=user : el));
        this.edit = false;
    }
    addUser(user: User) {   
        if (!user.name || !user.surname) 
            return;
        this.arr.push(user);
    };
}

const users = new Users();
export default users;