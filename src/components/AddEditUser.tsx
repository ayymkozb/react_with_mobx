import React, { FC, useCallback } from "react";
import "./App/App.css";
import {useAsObservableSource, Observer } from "mobx-react-lite";
import  {User}  from "../stores/menu-store";

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
        <button onClick={handleClick}>{isEdit ? "Edit User" : "AddUser"}</button>
      </>
    );
  };

  export default AddEditUser;