import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faFileShield, faMoneyBillTransfer, faCaretDown} from '@fortawesome/free-solid-svg-icons';



const AdminPage = () => {
    return ( 
        <body>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/pendingClaim" >Approve Claims</Link>
            </nav>
            <div class="divider"></div>

            <h1>ADMIN PAGE</h1>
            <br></br>
        </body>
     );
}


function StatusOut() {
    return(<h2>Not Admin!!!</h2>)
}
 
function Status() {                         //Checks if user is logged in and renders based on login status
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user.email === "linemanager@gmail.com") {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false);  //console.log("FALSE")
      }
    })
    return loginStatus
  }

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <AdminPage/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;

