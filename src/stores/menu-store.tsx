import { observable } from "mobx";

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

  @observable userToEdit?: User;

  deleteUser(user: User) {
    this.arr.remove(user);
  }

  setUserToEdit(user: User) {
    this.userToEdit = user;
  }

  editUser(user: User) {
    const userToEdit = this.arr.find(item => item.id === user.id);
    if (userToEdit) {
      userToEdit.age = user.age;
      userToEdit.name = user.name;
      userToEdit.surname = user.surname;
    }

    this.userToEdit = undefined;
  }

  addUser(user: User) {
    if (!user.name || !user.surname) return;
    this.arr.push(user);
  }
}

const users = new Users();
export default users;
