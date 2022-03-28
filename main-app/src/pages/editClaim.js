import {Link, useLocation} from "react-router-dom";


function EditClaimPage ()  {

    const location = useLocation();
    const data = location.state;
    console.log(data);

    return ( 
        <body>

            <nav className="navbar">
                <Link  className='navbuttons' to="/" >Home</Link>
                <Link  className='navbuttons' to="/about" >About</Link>
                <Link  className='navbuttons' to="/viewClaim" >view Claims</Link>
                <Link  className='navbuttons' to="/addClaim" >Add claims</Link>
                <Link  className='navbuttons' to="/LoginSignup" >Login and sign up</Link>
            </nav>
            <div>
                <h2>Edit Claim Page</h2>
            </div>
        </body>

        
     );
}
 
export default EditClaimPage;