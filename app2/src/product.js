import './App.css';
import {useState} from 'react';

function App() {
  const [name,setName] = useState('')
  const click = async() => {
    try{
      const response = await fetch(https://api.restful-api.dev/objects?name=${name});
      const data = await response.json();
      console.log(data)
      for(let a in data){

        console.log(a)
      }
    } catch(error){
      console.error('Error fetching the data:',error);
    }
  };
  
  return (
    <div className="App">
      <button onClick={click}>Get name from API</button>      
    </div>
  );
}

export default A