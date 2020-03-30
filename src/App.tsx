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
const ViewUsers: FC<{user: User}> = ({user}) => {
  return (<>
    <div className="row">
    <div className="col">{user.id}</div>
    <div className="col">{user.name}</div>
    <div className="col">{user.surname}</div>
    <div className="col">{user.age}</div>
    <button onClick={()=>users.deleteUser(user.id)}>Delete</button>
    <button onClick={()=> users.currentEditField(user)}>Edit</button>
  </div>
  </>)
}
const App = observer(() => {
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
        {users.arr.map(user => <ViewUsers user={user}/>)}
      </div>
    </>)
})

export default App;
