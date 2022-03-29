
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase.js'
import db, { storage } from "../firebase";
import "../main.css";
import { async } from '@firebase/util';
import { collection } from 'firebase/firestore';

function Login_Signup() {

    //Register + Login states
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginrPassword]  = useState("");

    //Auth state
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {                         //Shows current user login status - Acts like a server var?
        setUser(currentUser)
    })

    async function AddToProfile() {

        const authorize = getAuth()
        const getCurrentUser = authorize.currentUser
    
        //Collection state
        const createCollection = collection(db, getCurrentUser.email)
    
    }
    
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
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/viewClaim" >view Claims</Link>
                <Link className='navbuttons' to="/addClaim" >Add claims</Link>
            </nav>

            <h1>New empty page</h1>
            <br></br>


            <form className='LS'>
                <h3>Signup</h3>
                <input type="email" placeholder='Email...' onChange={(event) => {setRegisterEmail(event.target.value)}} required/>
                <input placeholder='Password...' onChange={(event) => {setRegisterPassword(event.target.value)}} required/>

                <input type="button" onClick={register} value={"Signup"} ></input>
            </form>


            <form className='LS'>
                <h3>Employee/Staff Login</h3>
                <input placeholder='Email...' onChange={(event) => {setLoginEmail(event.target.value)}}/>
                <input placeholder='Password...' onChange={(event) => {setLoginrPassword(event.target.value)}}/>

                <input type="button" onClick={login} value={"Login"}></input>
            </form>

            <div className='LS'>
                <h3>User - logged in</h3>


                <button onClick={logout}>Logout</button>
            </div>
            <br/>
                Logged in as:  {user?.email}
            <br/>
        </>
    );
}
 
export default Login_Signup;