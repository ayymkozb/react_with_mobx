import React, { FC, useCallback } from "react";
import "./App.css";
import users from "./stores/menu-store";
import { User } from "./stores/menu-store";
import { observer, useAsObservableSource, Observer } from "mobx-react-lite";

const AddEditUser: FC<Partial<User> & { isEdit?: boolean; saveUser(user: User): void }> = ({
  isEdit,
  saveUser,
  children,
  ...props
}) => {
  const localStore = useAsObservableSource<User>({
    age: props.age || 0,
    id: props.id || Math.random(),
    name: props.name || "",
    surname: props.surname || ""
  });

  const inputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "name") {
        localStore.name = value;
      } else if (name === "surname") {
        localStore.surname = value;
      } else if (name === "age") {
        localStore.age = Number(value);
      }
    },
    [localStore.age, localStore.name, localStore.surname]
  );

  const handleClick = useCallback(() => {
    saveUser({ ...localStore });
    localStore.name = "";
    localStore.age = 0;
    localStore.surname = "";
    localStore.id = Math.random();
  }, [localStore, saveUser]);

  return (
    <>
      Name:
      <Observer>{() => <input value={localStore.name} name="name" onChange={inputChange} />}</Observer>
      Surname:
      <Observer>{() => <input value={localStore.surname} name="surname" onChange={inputChange} />}</Observer>
      Age:
      <Observer>{() => <input value={localStore.age} name="age" onChange={inputChange} />}</Observer>
      <Observer>{() => <button onClick={handleClick}>{isEdit ? "Edit User" : "AddUser"}</button>}</Observer>
    </>
  );
};

const ViewUsers: FC<{ user: User; setUserToEdit(user: User): void }> = ({ user, setUserToEdit }) => {
  return (
    <>
      <div className="row">
        <div className="col">{user.id}</div>
        <div className="col">{user.name}</div>
        <div className="col">{user.surname}</div>
        <div className="col">{user.age}</div>
        <button onClick={() => users.deleteUser(user.id)}>Delete</button>
        <button
          onClick={() => {
            setUserToEdit(user);
          }}
        >
          Edit
        </button>
      </div>
    </>
  );
};

const App = observer(() => {
  const handleEdit = useCallback((user: User) => {
    users.setUserToEdit(user);
  }, []);

  return (
    <>
      <div>
        <h2>AddUser</h2>
        <AddEditUser saveUser={user => users.addUser(user)} />
      </div>
      {users.userToEdit ? (
        <div>
          <h2>Edit user</h2>
          <AddEditUser
            isEdit
            saveUser={user => users.editUser(user)}
            name={users.userToEdit.name}
            surname={users.userToEdit.surname}
            age={users.userToEdit.age}
            id={users.userToEdit.id}
          />
        </div>
      ) : null}
      <div>
        <h2>View Users</h2>
        {users.arr.map(user => (
          <ViewUsers setUserToEdit={handleEdit} user={user} />
        ))}
      </div>
    </>
  );
});

export default App;
