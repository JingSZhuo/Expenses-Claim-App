import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, getDoc ,getDocs, doc, setDoc } from "firebase/firestore";
import {Link} from "react-router-dom";
    
function ViewClaim(){
    
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
          <div class="dropdown">
              <button class="dropbtn">Claims
               <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                  <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                  <Link className='navbuttons' to="/addClaim">Add New Claim</Link>
              </div>
        </div>
        <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>
      </nav>
      <div class="divider"></div>
        <h2>My Claims</h2>

        <div>
          {data.map((testing) => {
            //Implement function for ID for each claim?

            return (
              <div>
                <a>Claim: {testing.Claim}</a>,
                <a> Claim Description: {testing.Description}</a>
                <a> Amount: £{testing.Amount}</a>,
                <a> Sort Code: {testing.SortCode}</a>,
                <a> Account No: {testing.AccountNumber}</a>,
                <a> ClaimID: {testing.id}</a>,
                <a> Status: {testing.Approve}</a>
               {/* , <Link to="/editClaim" state={testing.id} >Edit Claim</Link>*/}
                <br></br>
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
                { Status() === true ?  <ViewClaim/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;
