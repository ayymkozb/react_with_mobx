import React, { useState, FC, useEffect} from "react";
// import logo from './logo.svg';
import "./App.css";
import users from './stores/menu-store';
import {User} from './stores/menu-store';
import {observer} from 'mobx-react-lite';
// import { userInfo } from 'os';
// import { stringify } from 'querystring';


const AddEditUser: FC<{edit: boolean, currentUser: User}> = 
({edit, currentUser}) => {
  const [user, setUser] = useState(currentUser);
  useEffect(()=> {
    setUser(currentUser);
  }, [currentUser])
  function inputChange(e: any) {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  function handleInput() {
    edit ? users.editUser(user) : users.addUser(user);
    currentUser = {id: Math.random(), name: '', surname: '', age: 0};
    setUser(currentUser);
  }
  return(
    <>
      Name:<input value={user.name} name="name" onChange={inputChange}/>
      Surname:<input value={user.surname} name="surname" onChange={inputChange}/>
      Age:<input value={user.age} name="age" onChange={inputChange}/>
      <button onClick={handleInput}>{edit ? 'Edit User' : 'AddUser'}</button>
    </>
  )
}

const App = observer(() => {
  let users1 = users.arr.map((el: any)=><div className="row">
    <div className="col">{el.id}</div>
    <div className="col">{el.name}</div>
    <div className="col">{el.surname}</div>
    <div className="col">{el.age}</div>
    <button onClick={()=>users.deleteUser(el.id)}>Delete</button>
    <button onClick={()=> users.currentEditField(el)}>Edit</button>
  </div>)
  return (
    <>
      <div>
        <h2>AddUser</h2>
        <AddEditUser edit={false} currentUser={users.currentAddUser}/>
      </div>
      {users.edit ? (<div>
        <h2>Edit user</h2>
        <AddEditUser edit={true} currentUser={users.currentEditUser}/>
      </div>) : <></>}
      <div>
        <h2>View Users</h2>
        {users1}
      </div>
    </>)
})

export default App;
