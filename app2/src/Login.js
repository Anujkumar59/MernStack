import { useDebugValue, useState } from 'react';


function Login(){
    const[name,setName]= useState('');
    const[Password,setPassword] = useState('')

    const apifunc = async() => {
        let data = {
            "email": name,
            "password":Password
        }
        let res = await fetch("https://reqres.in/api/login",{"method":"POST", body:JSON.stringify(data),headers:{"content-type":"application/json"}});
        let userData = await res.json();
        console.log(userData);

        if(res.ok){
            alert("you are correct")
        }else{
            alert("you are wrong")
        }
    }

    const validation = () =>{

        if (name == ""){
            alert ("First fill name before clicking")
          }else if(Password == ""){
            alert ("First fill password before clicking")
          }else{
            alert("submit successfully")
            apifunc()
          }
    }
    return(
        <div>      
            <h2>Name: </h2>
            <input type = "text" onChange={(n)=> setName(n.target.value)}/>
            <h2>password: </h2>
            <input type = "password" onChange={(p)=> setPassword(p.target.value)}/><br/>
            <button onClick={() => validation()}>Click</button>

            
        </div>
    )
}

export default Login;
