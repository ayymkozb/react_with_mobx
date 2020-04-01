import React, { FC} from "react";
import "./App/App.css";
import { User } from "../stores/menu-store";
import AddEditUser from "./AddEditUser"

const EditForm: FC<{userToEdit: User, editUser(user: User): void}> = ({userToEdit, editUser}) => {
    return (
      <AddEditUser
              isEdit
              saveUser={editUser}
              name={userToEdit.name}
              surname={userToEdit.surname}
              age={userToEdit.age}
              id={userToEdit.id}
            />
    )
}

export default EditForm;