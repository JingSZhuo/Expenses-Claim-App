import {Link, useLocation} from "react-router-dom";
import {collection, query, where, getDocs  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../firebase";
import { useEffect, useState } from "react";


function EditClaimPage ()  {

    //Auth Settings
    const auth = getAuth();
    const user = auth.currentUser;

    //Collection settings
    const [dataDoc, getDataDoc] = useState([])
    const q = query(collection(db, user.email), where())

    useEffect(() => {
        const getData1 = async () => {
            const data = await getDocs(q);
            getDataDoc(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
          }
          getData1() 
    })

    const location = useLocation();
    const data = location.state;
    console.log(data);

    return ( 
        <body>
            {dataDoc.map(() => { 
                <div></div>
             })}

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
            <h2>Show selected data:</h2>
        </body>

        
     );
}
 
export default EditClaimPage;