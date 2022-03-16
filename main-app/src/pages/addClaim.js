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
            ClaimId: Date.now(),
            Claim: document.getElementById("title").value,
            Amount: document.getElementById("amount").value,

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

            <form className="claimform">
                <div className="formbox">
                    <h3>Claim title</h3>
                    <input id="title" type="text" placeholder="Enter claim title " required></input>

                    <h3>Enter Amount</h3>
                    <input id="amount" type="number" placeholder="Enter Amount " required></input>

                    <br></br>

                    <button onClick={page1}>Enter</button>
                </div>
                
            </form>


        </>
    )

}

export default page1;