import { Link } from 'react-router-dom';

function AboutPage ()  {
    return ( 
        <body>

            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                <Link className='navbuttons' to="/LoginSignup" >Login and Sign-Up</Link>
            </nav>
            <div>
                <h2>Add new content</h2>
            </div>
            <h1>Hi</h1>
        </body>

        
     );
}
 
export default AboutPage;