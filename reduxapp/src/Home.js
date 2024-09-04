import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import { useState } from "react";

const Home = () => {
    const countVal = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    const [status,setstatus]=useState(true);

    const add = () => {
        dispatch({
            type: 'add',
        })
    };
    
    const sub = () => {
        dispatch({
            type: 'sub',
        })
    };

    const storeDetailsFun = () => {
        dispatch({
            "type":"saveDetails",
            "data" : {"name":" Anuj kumar " , "email":"anujjangir8@gmail.com"}
        })
    }

    return (
        <div className="Homepage">
            <Header/>
            <h1>This is the home page</h1>
            <h1> Your Counter value: {countVal}</h1>
            <input type="button" value="add"  onClick={add}/>
            <input type="button" value="sub"  onClick={sub}/>
            <h4> This will display in about page! </h4>
            <button onClick = { storeDetailsFun }> display </button>
            {(status)?<p className="red">this is paragraph</p>:null}
        </div>
    );
    
};

export default Home;