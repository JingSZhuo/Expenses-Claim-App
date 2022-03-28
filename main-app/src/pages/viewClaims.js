import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, getDoc ,getDocs, doc } from "firebase/firestore";
import {Link} from "react-router-dom";
    
function StatusIn(){
    
    //...............................................................................
    const auth2 = getAuth();
    const user2 = auth2.currentUser;

    const [data, getData] = useState([])
    const usersCollectionRef = collection(db, user2.email)

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(usersCollectionRef);
        getData(data_1.docs.map((doc1) => ({...doc1.data(), id: doc1.id })))
      }
      getData1()
    }, [])
    
    return(
    <>
        <nav className="navbar">
              <Link className='navbuttons' to="/addClaim" >Add Claim</Link>
              <Link className='navbuttons' to="/LoginSignup" >Login and Sign-Up</Link>
        </nav>

        <h2>Logged in!</h2>

        <div>
          {data.map((testing) => {
            //Implement function for ID for each claim?
            return (
              <div>
                <a>Data: {testing.ClaimId}</a>
                <a>, {testing.Claim}</a>
                <a>, £{testing.Amount}</a>
                <a>, ID: {testing.id}</a>
                //implement onclick function and pass its ID?? 
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
 
function Status() {
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user) {
        setLoginStatus(true); 
      } else {
        setLoginStatus(false); 
      }
    })
    
    return loginStatus
  }

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <StatusIn/> : <StatusOut/>}
                <h1>Claims page</h1>
        </div>

    );
}
 
export default viewClaim;
