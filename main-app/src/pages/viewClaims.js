import { useState } from "react";
//import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth} from "firebase/auth";

function StatusIn(){
    return(<h2>Logged in!</h2>)
}
function StatusOut() {
    return(<h2>ERROR!!!</h2>)
}
 
function Status() {
    const  [loginStatus, setLoginStatus] = useState("false")
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus("true"); console.log("!!!")
      } else {
        setLoginStatus("false"); console.log("???")
      }
    })
    
    return loginStatus
  }

const viewClaim = () => {

      //<h2>{ Status.loginStatus === "true" ? console.log("Logged in") : console.log("Logged out")}</h2>

    return (  
        <body>
            <h1>claims</h1>
                { Status() === "true" ?  <StatusIn/> : <StatusOut/>}
        </body>

    );
}
 
export default viewClaim;