import { useSelector } from "react-redux";
import Header from "./Header";

const About = () => {
    //const counterVal = useSelector((state) => state.counter);
    const myDetails = useSelector((state) => state.myDetails);

    return(
        <div> 
            <Header />
            <div> This the About page</div>
            <h1> {myDetails.name} </h1>
        </div>
    )
};

export default About;