import React, { FC, useCallback } from "react";
import "../App.css";
import { User } from "../stores/menu-store";
import { observer } from "mobx-react-lite";

const ViewUsers: FC<{ user: User; setUserToEdit(user: User): void; deleteUser(user: User): void }> = observer(
    ({ user, setUserToEdit, deleteUser }) => {
      const handleDelete = useCallback(() => {
        deleteUser(user);
      }, [deleteUser, user]);
  
      const handleEdit = useCallback(() => {
        setUserToEdit(user);
      }, [setUserToEdit, user]);
  
      return (
        <>
          <div className="row">
            <div className="col">{user.id}</div>
            <div className="col">{user.name}</div>
            <div className="col">{user.surname}</div>
            <div className="col">{user.age}</div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </>
      );
    }
  );
  export default ViewUsers;