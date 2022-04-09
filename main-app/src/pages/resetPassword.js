import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import BackgroundParticles from './BackgroundParticles';

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
        <>

        <body>
            <BackgroundParticles />

            <div class="form-container">
                <form class="form-wrap">
                    <h2>Forgot Password</h2>
                        <div class="form-box">
                            <input id='emailpasswordreset' type="text" placeholder="Enter Email" />
                        </div>
                    <div class="form-submit">
                        <button className="" type="button" value="Send" onClick={resetPassword}> Send </button> 
                    </div>
                </form>
            </div>
        </body>
        
        </>
     );
}
 
export default PasswordResetPage;