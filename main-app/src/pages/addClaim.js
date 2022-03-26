import {Link} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import db, { auth, storage } from "../firebase";
import "../main.css";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

function AddClaimPage() {

    const [image, setImage] = useState('');

    function uploadImage() {
        
        if (image == null) {return;}

        console.log("Check if this is :" + image)

        const storage = getStorage();
        const storageRef = ref(storage, `${image}` )

        const uploadTask = uploadBytesResumable(storageRef)

        uploadTask.on('state_changed', () => {})
    }

    async function addtoDB(){

        const auth3 = getAuth();
        const user = auth3.currentUser;
    
        const createCollection = collection(db, user.email)
        await setDoc(doc(createCollection), {
            ClaimId: Date.now(),
            Claim: document.getElementById("title").value,
            Amount: document.getElementById("amount").value,
        }) 


        /*Reset input fields after submit */
        document.getElementById("title").reset();
        document.getElementById("amount").reset();
        document.getElementById("evidence").reset();
    }
   
    return( 

        <>
            <nav className="navbar">
                <Link className='navbuttons' to="/name1">new page</Link>
                <Link className='navbuttons' to="/LoginSignup">Login and Sign-Up</Link>
            </nav>
        
            <h1>Add Claim</h1>

            <form className="claimform">
                <div className="formbox">
                    <h3>Claim title</h3>
                    <input id="title" type="text" placeholder="Enter claim title " ></input>

                    <h3>Enter Amount</h3>
                    <input id="amount" type="number" placeholder="Enter Amount " ></input>

                    <br></br>
                    <h3>Upload</h3>
                    <input id="evidence" type="file" placeholder="No file uploaded" onChange={(e) => { setImage(e.target.files[0]) }}></input>

                    <br></br>

                    <input type="button" onClick={() =>  {addtoDB(); uploadImage() }} value={"upload"}></input>
                </div>
            </form>
        </>
    )
}

export default AddClaimPage;