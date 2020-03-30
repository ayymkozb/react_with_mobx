import React, { useState, FC, useEffect} from "react";
// import logo from './logo.svg';
import "./App.css";
import users from './stores/menu-store';
import { Users } from './stores/menu-store';
import {observer} from 'mobx-react-lite';
// import { userInfo } from 'os';
// import { stringify } from 'querystring';

const AddUser: FC<{arr: Users['arr']}> = ({arr}) => {
  const [user, stateUser] = useState({id: arr.length+1, name: '', surname: '', age: 0});
  //console.log(arr.length);
  useEffect(() => {
    stateUser({id: arr.length+1, name: '', surname: '', age: 0})
  }, [arr])
  function inputChange(e: any) {
    const {name, value} = e.target;
    stateUser({...user, [name]: value});
  }
  function handleInput() {
    users.addUser(user);
  }
  return (<>
    Name:<input value={user.name} name="name" onChange={inputChange}/>
    Surname:<input value={user.surname} name="surname" onChange={inputChange}/>
    Age:<input value={user.age} name="age" onChange={inputChange}/>
    <button onClick={handleInput}>Add User</button></>
  )
}

const EditUser: FC<{currentUser: Users['currentEditUser']}> = 
({currentUser}) => {
  const [user, setUser] = useState(currentUser);
  useEffect(()=> {
    setUser(currentUser);
  }, [currentUser])
  function inputChange(e: any) {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }
  // function handleEdit() {
  //   users.editUser(user)
  // }
  return(
    <>
      Name:<input value={user.name} name="name" onChange={inputChange}/>
      Surname:<input value={user.surname} name="surname" onChange={inputChange}/>
      Age:<input value={user.age} name="age" onChange={inputChange}/>
      <button onClick={()=>users.editUser(user)}>edit User</button>
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
        <AddUser arr={users.arr}/>
      </div>
      {users.edit ? (
        <div>
          <h2>Edit user</h2>
          <EditUser currentUser={users.currentEditUser}/>
        </div>
      ) : <></>}
      <div>
        <h2>View Users</h2>
        {users1}
      </div>
    </>)
})

export default App;
