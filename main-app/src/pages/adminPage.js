import React, { } from 'react';
import { Link } from 'react-router-dom';

const adminPage = () => {
    return ( 
        <body>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/pendingClaim" >Approve Claims</Link>
            </nav>

            <h1>ADMIN PAGE</h1>
            <br></br>
        </body>
     );
}
 
export default adminPage;