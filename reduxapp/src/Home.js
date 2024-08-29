import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";


function Home(){
    const counterVal = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const add =() =>{
        dispatch({
          type: "add"
        })
      }
    const sub =() =>{
        dispatch({
            type: "sub"
        })
      }

    return(
        <div>
            <Header/>
            <h1>Your age: {counterVal}</h1>
            <input type = "button" value="Add" onClick={add}/>
            <input type = "button" value="sub" onClick={sub}/>
        </div>
    )
    
}

export default Home;