import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import BackgroundParticles from './BackgroundParticles';
import {Link} from "react-router-dom";

const PasswordResetPage = () => {

    const auth = getAuth()

    const resetPassword = async () => {
        const emailReset = document.getElementById('emailpasswordreset').value
        try{
            await sendPasswordResetEmail(auth, emailReset)
            alert("sent!")
        }
        catch (e) {
            console.log(e.message)
            alert('Email does not exist on our database!')
        }
    } 

    return ( 


        <body>

            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>
            </nav>

            <BackgroundParticles />

            <div class="form-container">
                <form class="form-wrap">
                    <h2>Forgot Password</h2>
                        <div class="form-box">
                            <input id='emailpasswordreset' className='input' type="text" placeholder="Enter Email" />
                        </div>
                    <div class="form-submit">
                        <button className="" type="button" value="Send" onClick={resetPassword}> Send </button> 
                    </div>
                </form>
            </div>
        </body>
     );
}
 
export default PasswordResetPage;