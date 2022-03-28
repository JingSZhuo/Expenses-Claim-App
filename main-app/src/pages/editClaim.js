import { Link } from 'react-router-dom';

function Create ()  {
    return ( 
        <body>

            <nav className="navbar">
                <Link  className='navbuttons' to="/" >Home</Link>
                <Link  className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/claimPage" >view Claims</Link>
                <Link className='navbuttons' to="/addClaim" >Add claims</Link>
                <Link  className='navbuttons' to="/LoginSignup" >Login and sign up</Link>
            </nav>
            <div>
                <h2>Edit Claim Page</h2>
            </div>
        </body>

        
     );
}
 
export default Create;