import { Link } from 'react-router-dom';

function Create ()  {
    return ( 
        <body>
            <div>
                <h2>Add new content</h2>
                <Link to="/" >Home</Link>
                <Link to="/LoginSignup" >Login and sign up</Link>
            </div>
            <h1>Hi</h1>
        </body>

        
     );
}
 
export default Create;