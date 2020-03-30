// import logo from './logo.svg';
import { setServers } from "dns";
// import { userInfo } from 'os';
// import { stringify } from 'querystring';
import {observable} from 'mobx';  

class Users {
    @observable arr = [ 
            {id: 1, name: 'Tanya', surname: 'Baikova', age: 18}, 
            {id: 2, name: 'Pasha', surname: 'Sukhov',  age: 16}
        ];
    @observable edit = false;
    @observable currentEditUser = {name: '', surname: '', age: 0}

    currentEditField(user: any) {
        this.edit = true;
        this.currentEditUser = user;
    }
    deleteUser(id: number) {
        this.edit = false;
        this.arr = this.arr.filter(el=> el.id !== id);
    }
    editUser(user: any) {
        this.arr = this.arr.map((el => el.id===user.id ? el=user : el));
    }
    addUser(user: any) {
        if (!user.name || !user.surname) 
            return;
        this.arr.push(user);
    };
}

const users = new Users();
export default users;
export {Users}