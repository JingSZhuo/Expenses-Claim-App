import { Link,  Outlet } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";

//Images

//Pages
import "./main.css"
import "./reset.css"
import { useEffect, useState } from 'react';

function App() {

  const logout = async () => {
    await signOut(auth)
  };

  const auth = getAuth();
  const user = auth.currentUser;

  return (
      <div className="App">

            <nav className="navbar">
              <Link className='navbuttons' to="/" >Home</Link>
              <Link className='navbuttons' to="/about" >About</Link>
              <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
              {user !==null ? <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>}
            </nav>

        <h1>Homepage</h1>
            <Outlet/>

      </div>

  );
}

export default App;
