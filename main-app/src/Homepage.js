import { Link,  Outlet } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";

//Images

//Pages
import "./main.css"
import "./reset.css"
import { useEffect, useState } from 'react';

function App() {

  const  [loginStatus, setLoginStatus] = useState(false)

  function Status() {                         //Checks if user is logged in and renders based on login status
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user!== null) {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false);  //console.log("FALSE")
      }
    })
    return loginStatus
  }
  useEffect(() => {       //run once
    Status()
  }, [])

  const logout = async () => {
    await signOut(auth)
  };

  const auth = getAuth();

  return (
      <div className="App">

            <nav className="navbar">
              <Link className='navbuttons' to="/" >Home</Link>
              <Link className='navbuttons' to="/about" >About</Link>
              <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
              {loginStatus === true ? <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>}
            </nav>

        <h1>Homepage</h1>
            <Outlet/>

      </div>

  );
}

export default App;
