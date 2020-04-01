import React, { FC } from "react";
import "./App/App.css";
import { User } from "../stores/menu-store";
import AddEditUser from "./AddEditUser";
import { observer } from "mobx-react-lite";

const EditForm: FC<{ userToEdit: { user?: User }; editUser(user: User): void }> = ({ userToEdit, editUser }) => {
  return userToEdit.user ? (
    <AddEditUser
      isEdit
      saveUser={editUser}
      name={userToEdit.user.name}
      surname={userToEdit.user.surname}
      age={userToEdit.user.age}
      id={userToEdit.user.id}
    />
  ) : null;
};

export default observer(EditForm);
