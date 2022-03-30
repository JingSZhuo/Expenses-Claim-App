import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, getDoc ,getDocs, doc, setDoc } from "firebase/firestore";
import {Link} from "react-router-dom";
    
function StatusIn(){
    
    //...............................................................................
    const auth = getAuth();
    const user = auth.currentUser;

    const [data, getData] = useState([])
    const usersCollectionRef = collection(db, user.email)

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(usersCollectionRef);
        getData(data_1.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
      getData1()
    }, [])
    
    return(
    <>
        <nav className="navbar">
            <Link className='navbuttons' to="/" >Home</Link>
            <Link className='navbuttons' to="/about" >About</Link>
            <Link className='navbuttons' to="/addClaim" >Add Claim</Link>
            <Link className='navbuttons' to="/LoginSignup" >Login and Sign-Up</Link>
        </nav>

        <h2>My Claims</h2>

        <div>
          {data.map((testing) => {
            //Implement function for ID for each claim?

            return (
              <div>
                <a>Claim: {testing.Claim}</a>,
                <a>Amount: £{testing.Amount}</a>,
                <a>ClaimID: {testing.id}</a>
                <a>TestMAP: {testing.test.testmap}</a>
                , <Link to="/editClaim" state={testing.id} >Edit Claim</Link>
              </div>
            );
          })}
        </div>
    </>
    )
}

function StatusOut() {
    return(<h2>Not Logged In!!!</h2>)
}
 
function Status() {                         //Checks if user is logged in and renders based on login status
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user) {
        setLoginStatus(true); console.log("TRUE")
      } else {
        setLoginStatus(false);  console.log("FALSE")
      }
    })
    return loginStatus
  }

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <StatusIn/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;
