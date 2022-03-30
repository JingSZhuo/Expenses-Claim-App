import {Link} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, setDoc, getDocs, getDoc, query, where } from "firebase/firestore";
import db, { auth, storage } from "../firebase";
import "../main.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";

function AddClaimPage() {

    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null)
    const [imageType, setImageType] = useState(null)

    //Auth 
    const auth = getAuth()
    const getUser = auth.currentUser


    const uploadImage = () => {

        //Metadata
        const metadata = {
            contentType: `${imageType}`,
        }
        
        if (image == null) {return null;}

        console.log(image)

        const storage = getStorage();           //Access storage
        const storageRef = ref(storage, `${getUser.email}/`+`${imageName}` )      //If storage file/directory doesnt exist..create one

        uploadBytes(storageRef, image, metadata)            //Upload file with metadata
    }

    async function AddtoDB(){

        const auth = getAuth();
        const user = auth.currentUser;
    
        const getCollection = collection(db, user?.email)
        const generateID = doc(getCollection)                       //Creating new doc

        await setDoc(generateID, {
            ClaimId: generateID.id ,
            Claim: document.getElementById("title").value,
            Amount: document.getElementById("amount").value,
            Description: document.getElementById("description").value,
            SortCode: document.getElementById("sortcode").value,
            AccountNumber: document.getElementById("accountnumber").value
        }) 

        /*Reset input fields after submit */
        document.getElementById("title").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("evidence").value = "";
        document.getElementById("sortcode").value = "";
        document.getElementById("accountnumber").value = "";
    }
   
    return( 

        <>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                <Link className='navbuttons' to="/LoginSignup">Login and Sign-Up</Link>
            </nav>
        
            <h1>Add Claim</h1>

            <form className="claimform">
                <div className="formbox">
                    <h3>Claim title</h3>
                    <input id="title" type="text" placeholder="Enter claim title " ></input>

                    <h3>Enter Amount</h3>
                    <input id="amount" type="number" placeholder="Enter Amount " ></input>

                    <h3>Description</h3>
                    <input id="description" type="text" placeholder="Enter claim description" ></input>

                    <h3>Sort Code</h3>
                    <input id="sortcode" type="number" placeholder="Enter Sort Code" ></input>

                    <h3>Account Number</h3>
                    <input id="accountnumber" type="number" placeholder="Enter Account Number" ></input>

                    <br></br>
                    <h3>Upload</h3>
                    <input id="evidence" type="file" placeholder="No file uploaded" 
                        onChange={(e) => { 
                            setImage(e.target.files[0]); 
                            setImageName(e.target.files[0].name); 
                            setImageType(e.target.files[0].type) }}></input>
                    <br></br>

                    <input type="button" onClick={() =>  { AddtoDB(); uploadImage() }} value={"upload"}></input>
                </div>
            </form>
        </>
    )
}


function StatusOut() {
    return(<h2>Not Logged In!!!</h2>)
}
 
function Status() {                         //Checks if user is logged in and renders based on login status
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user) {
        setLoginStatus(true); 
      } else {
        setLoginStatus(false); 
      }
    })
    return loginStatus
}

const viewClaim = () => {

    return (  
        <div>
                { Status() === true ?  <AddClaimPage/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;