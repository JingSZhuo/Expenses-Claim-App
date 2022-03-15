import { Link } from 'react-router-dom';

function Create ()  {
    return ( 
        <body>

            <nav className="navbar">
                <Link  className='navbuttons' to="/" >Home</Link>
                <Link  className='navbuttons' to="/LoginSignup" >Login and sign up</Link>
            </nav>
            <div>
                <h2>Add new content</h2>
            </div>
            <h1>Hi</h1>
        </body>

        
     );
}
 
export default Create;