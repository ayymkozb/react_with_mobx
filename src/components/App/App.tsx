import React, { useCallback } from "react";
import "./App.css";
import users from "../../stores/menu-store";
import { User } from "../../stores/menu-store";
import { observer } from "mobx-react-lite";
import AddEditUser from "../AddEditUser";
import UsersList from "../UsersList";
import EditForm from "../EditForm";

const App = () => {
  const addUser = useCallback((user: User) => {
    users.addUser(user);
  }, []);

  const editUser = useCallback((user: User) => {
    users.editUser(user);
  }, []);

  const deleteUser = useCallback((user: User) => {
    users.deleteUser(user);
  }, []);

  const setUserToEdit = useCallback((user: User) => {
    users.setUserToEdit(user);
  }, []);

  return (
    <>
      <div>
        <h2>AddUser</h2>
        <AddEditUser saveUser={addUser} />
      </div>
      {users.userToEdit ? (
        <div>
          <h2>Edit user</h2>
          <EditForm editUser={editUser} userToEdit={users.userToEdit} />
        </div>
      ) : null}
      <div>
        <UsersList deleteUser={deleteUser} setUserToEdit={setUserToEdit} usersList={users.arr} />
      </div>
    </>
  );
};

export default App;
