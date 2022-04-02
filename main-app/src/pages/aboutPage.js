import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { useEffect, useState } from 'react';


function AboutPage ()  {

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

  const auth = getAuth();
  const logout = async () => {
    await signOut(auth)
  };

    return ( 
        <body class="about-body">

            <nav className="navbar">
              <Link className='navbuttons' to="/" >Home</Link>
              <Link className='navbuttons' to="/about" >About</Link>
                <div class="dropdown">
                    <button class="dropbtn">Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                     <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        {loginStatus === true ?<Link className='navbuttons' to="/viewClaim" >View Claims</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">View Claims</Link>}
                        {loginStatus === true ? <Link className='navbuttons' to="/addClaim">Add New Claim</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Add New Claim</Link>}
                    </div>
              </div>
              {loginStatus === true ? <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> :  <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>}
            </nav>
            <div class="divider"></div>

            <div class="about-main-container">
            <div class="about-page">
            <div class="divider"></div>
            <h1 class="about-title">About</h1>
            <p class="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            </div>
            <div class="divider divider-bottom"></div>
            </div>



        </body>
        

        
     );
}
 
export default AboutPage;