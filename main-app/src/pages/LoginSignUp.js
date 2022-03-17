
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'
import "../main.css";

function Login_Signup() {
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginrPassword]  = useState("");

    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {                         //Shows current user login status - Acts like a server var?
        setUser(currentUser)
        console.log(currentUser)
    })
    
    /*Register and Login Functions*/ 

    const register = async () => {
        try{
        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)

        } catch (error) { 
            console.log(error.message) 
        }
    };
    const login = async () => {
        try{
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    
            } catch (error) { 
                console.log(error.message) 
            }
    };

    const logout = async () => {
        await signOut(auth)
    };



     return (  
        <>

        
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/name1" >new page</Link>
                <Link className='navbuttons' to="/claimPage" >view Claims</Link>
                <Link className='navbuttons' to="/addClaim" >Add claims</Link>
            </nav>

            <h1>New empty page</h1>
            <br></br>

            <div className='LS'>
                <h3>Signup</h3>
                <input type="email" placeholder='Email...' onChange={(event) => {setRegisterEmail(event.target.value)}} required/>
                <input placeholder='Password...' onChange={(event) => {setRegisterPassword(event.target.value)}} required/>

                <button onClick={register}>Create user</button>
            </div>
            <div className='LS'>
                <h3>Employee/Staff Login</h3>
                <input placeholder='Email...' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                <input placeholder='Password...' onChange={(event) => {setLoginrPassword(event.target.value)}}/>

                <button onClick={login}>Login</button>
            </div>
            <div className='LS'>
                <h3>User - logged in</h3>


                <button onClick={logout}>Logout</button>
            </div>
            <br/>
                {user?.email}
            <br/>
        </>
    );
}
 
export default Login_Signup;