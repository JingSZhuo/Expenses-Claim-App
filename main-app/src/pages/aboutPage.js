import { Link } from 'react-router-dom';

function AboutPage ()  {
    return ( 
        <body>

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

            <div>
                <h2>Add new content</h2>
            </div>
            <h1>Hi</h1>
        </body>

        
     );
}
 
export default AboutPage;