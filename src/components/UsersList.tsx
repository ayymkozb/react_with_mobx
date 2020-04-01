import React, { FC} from "react";
import "./App/App.css";
import { User } from "../stores/menu-store";
import { observer} from "mobx-react-lite";
import UsersTable from "./UsersTable"

const UsersList: FC<{ usersList: User[]; setUserToEdit(user: User): void; deleteUser(user: User): void }> = observer(
    ({ usersList, deleteUser, setUserToEdit }) => {
      return (
        <>
          <h2>View Users</h2>
          {usersList.map(user => (
            <UsersTable key={user.id} user={user} setUserToEdit={setUserToEdit} deleteUser={deleteUser} />
          ))}
        </>
      );
    }
  );

export default UsersList;