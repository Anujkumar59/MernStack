import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { useState } from 'react';
function App() {
  let firstname = "Anuj";
const[email,setEmail]= useState('');
const[number,setnumber]= useState('');
 const[address,setAddress]=useState('');
 const validate=()=>{
  if(email == ""){
    alert("email is empty");
  }else if(number ==""){
    alert("number is empty")
  }else{
    alert("everything fine")
  }

 }
  return (
    <div className="container">
      <h1>this is react App</h1>{
        firstname
      }<div>{email}</div>
      {address}
      {number}
      <Home/>
      <input type='text' placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type='text' onChange={(e)=>setnumber(e.target.value)}/>
      <input type='text' onChange={(e)=>setnumber(e.target.value)}/>
      <button onClick={()=> validate()}>click</button>
      </div>
  );
}
export default App;