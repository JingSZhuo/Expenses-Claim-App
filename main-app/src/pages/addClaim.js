import {Link} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import db, { auth } from "../firebase";
import "../main.css";

function page1() {

    async function addtoDB(){
        const auth3 = getAuth();
        const user = auth3.currentUser;
    
        const createCollection = collection(db, user.email)
        await setDoc(doc(createCollection), {
            id: Date.now(),
            claim: document.getElementById("title").value,
            amount: "£" + "123",

        }) 
    }

    addtoDB()
   

    return( 

        <>
            <nav className="navbar">
                <Link className='navbuttons' to="/name1">new page</Link>
                <Link className='navbuttons' to="/LoginSignup">Login and Sign-Up</Link>
            </nav>
        
            <h1>Add Claim</h1>
                <input id="title" placeholder="Enter some text... "></input>
                <button onClick={page1}>Enter</button>


        </>
    )

}

export default page1;