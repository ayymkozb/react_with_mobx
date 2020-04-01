import { observable, action } from "mobx";
import { access } from "fs";

export interface User {
  id: number;
  name: string;
  surname: string;
  age: number;
}
class Users {
  readonly arr = observable<User>([
    { id: 1, name: "Tanya", surname: "Baikova", age: 18 },
    { id: 2, name: "Pasha", surname: "Sukhov", age: 16 }
  ]);

  @observable userToEdit: { user?: User } = {
    user: undefined
  };

  @action deleteUser(user: User) {
    this.userToEdit.user = undefined;
    this.arr.remove(user);
  }

  @action setUserToEdit(user: User) {
    this.userToEdit.user = user;
  }

  @action editUser(user: User) {
    const userToEdit = this.arr.find(item => item.id === user.id);
    if (userToEdit) {
      userToEdit.age = user.age;
      userToEdit.name = user.name;
      userToEdit.surname = user.surname;
    }
    this.userToEdit.user = undefined;
  }

  @action addUser(user: User) {
    this.arr.push(user);
  }
}

const users = new Users();
export default users;
