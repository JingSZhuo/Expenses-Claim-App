import {Link} from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import db, { storage } from "../firebase";
import "../main.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import LoginSignup from "./LoginSignUp";


function AddClaimPage() {

    const [multipleImages, setMultipleImages] = useState([])
    const [multipleImageNames, setMultipleImageNames ] = useState([])
    const [multipleimageTypes, setMultipleImageTypes] = useState([])
    const [length, setLength] = useState(0)
    const [urls, setUrls] = useState([])
    const [docID, setdocID] = useState()
    const [docIDAdmin, setDocIDAdmin] = useState()
    const [currency, setCurrency] = useState()
    const [currencySign, setCurrencySign] = useState()

    //Auth 
    const auth = getAuth()
    const getUser = auth.currentUser

    //UseEffects
    useEffect(() => {
        DisableOnStart()
    }, [])

    useEffect(() => { 
        AddURLToDB()
    }, [urls, docID, docIDAdmin])

    function DisableOnStart () {
        document.getElementById('submitbutton').disabled = true;
    }
    function EnableOnUpload () {
        // || (title, amount, description, sortcode, accountnumber === "")
        if ((length === 0)){
            document.getElementById('submitbutton').disabled = true;
            alert('Please fill in all the fields and upload evidence!')
        } 
        else {document.getElementById('submitbutton').disabled = false;
        }
    }

    function SubmitFileCheck () {
        const title = document.getElementById('title').value
        const amount = document.getElementById('amount').value
        const description = document.getElementById('description').value
        const sortcode = document.getElementById('sortcode').value
        const accountnumber = document.getElementById('accountnumber').value
        if ((title, amount, description, sortcode, accountnumber === "")) {
            alert("Please fill in all fields")
        }
        else { AddtoDB()}
    }

    async function AddURLToDB () {
        const auth = getAuth();
        const user = auth.currentUser;

        const writeIntoDocument = doc(collection(db, "Employee"), docIDAdmin)
        const writeIntoDocumentTwo = doc(collection(db, user?.email),  docID)

        //console.log("urls: ", urls)

        await updateDoc( writeIntoDocument, {          
            URLS: urls ,
            }
        )
        await updateDoc( writeIntoDocumentTwo, {
            URLS: urls ,
            //URLS: "someurls" ,
            }
        )
    }

    const UploadFile = async () => {

        const storage = getStorage();           //Access storage

        
        for (let i = 0; i < length; i++ ) {
            const storageRef = ref(storage, `${getUser.email}/`+`${multipleImageNames[i]}` )      //If storage file/directory doesnt exist..create one
            const metadata = {
                contentType: `${multipleimageTypes[i]}`,
            }
            uploadBytes(storageRef, multipleImages[i], metadata)
        }
        console.log("URLS: ", urls)
    }

    async function AddtoDB(){

        const auth = getAuth();
        const user = auth.currentUser;
    
        const getCollection = collection(db, user?.email)
        const getCollection2 = collection(db, "Employee")

        const generateID = doc(getCollection)                       //Creating new doc
        const generateEmail = doc(getCollection2)

        const generatedId = generateID.id        //Generated ID in variable
        const generatedIdForAdmin = generateEmail.id

        setdocID(generatedId)
        setDocIDAdmin(generatedIdForAdmin)


        const dateNow = Date.now()

        await setDoc(generateID, {                      //individual database
            ID: dateNow,
            ClaimId: generatedId,
            Claim: document.getElementById("title").value,
            Amount: `${currencySign}` + document.getElementById("amount").value,
            AmountInGBP: "£"+`${currency}` ,
            Description: document.getElementById("description").value,
            SortCode: document.getElementById("sortcode").value,
            AccountNumber: document.getElementById("accountnumber").value,
            Approve: "Not Yet Approved",
            email: user.email,
            URLS: "" ,
            NoFiles: length
        }) 
        await setDoc(generateEmail, {                   //Employee database
            ID: dateNow,
            ClaimId: generatedId ,
            Claim: document.getElementById("title").value,
            Amount: document.getElementById("amount").value,
            Description: document.getElementById("description").value,
            SortCode: document.getElementById("sortcode").value,
            AccountNumber: document.getElementById("accountnumber").value,
            Approve: "",
            email: user.email,
            URLS: "" ,
            NoFiles: length
        })

        /*Reset input fields after submit */
        document.getElementById("title").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("evidence").value = "";
        document.getElementById("sortcode").value = "";
        document.getElementById("accountnumber").value = "";

        const arrayOfUrls = []
        for (let i = 0; i < length; i++ ) {
            const storageRef = ref(storage, `${getUser.email}/`+`${multipleImageNames[i]}` )      //If storage file/directory doesnt exist..create one
    
            await getDownloadURL(storageRef).then((url) => { 
                arrayOfUrls[i] = url
            })
            console.log(arrayOfUrls[i])    
        }
        setUrls(arrayOfUrls)
    }

    //Currency converter function

    function currencyConverter (x) {
        const currency = document.getElementById('currency').value 
        if (currency === "pound") {
            setCurrency(x); //console.log("GBP: ", x)
            setCurrencySign("£")
            return x
        }
        else if (currency === "euro") {
            const euroToGBP = x * 0.8
            setCurrency(euroToGBP.toFixed(2)); //console.log("EURO -> GBP: ", euroToGBP)
            setCurrencySign("€")
            return euroToGBP
        }
        else if (currency === "dollar") {
            const USDtoGBP = x * .75
            setCurrency(USDtoGBP.toFixed(2)); //console.log("USD -> GBP: ", USDtoGBP)
            setCurrencySign("$")
            return USDtoGBP
        }
    }

    //_____________________________________________________________________________________________________________________________


    const logout = async () => {
        await signOut(auth)
      };

   
    return( 

        <>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <div class="dropdown active-page">
                    <button class="dropbtn">Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                    <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                        <Link className='navbuttons' to="/addClaim">Add New Claim</Link>
                    </div>
                </div>
                <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
            </nav>

            <div>
                <h1>Add Claim</h1>
            </div>

            <form className="claimform">
                <div className="formbox">
                    <h3>Claim title</h3>
                    <input id="title" type="text" placeholder="Enter claim title " ></input>

                    <h3>Select Currency</h3>
                    <select name="currency" id="currency" onChange={() => { currencyConverter(document.getElementById('amount').value)}} >
                        <option value={"pound"}>GBP</option>
                        <option value={"euro"}>Euro</option>
                        <option value={"dollar"}>USD</option>
                    </select>

                    <h3>Enter Amount</h3>
                    <input id="amount" type="number" placeholder="Enter Amount " onChange={() => { currencyConverter(document.getElementById('amount').value)}} ></input>

                    <h4>GBP: £{currency} </h4>

                    <h3>Description</h3>
                    <input id="description" type="text" placeholder="Enter claim description" ></input>

                    <h3>Sort Code</h3>
                    <input id="sortcode" type="number" placeholder="Enter Sort Code" ></input>

                    <h3>Account Number</h3>
                    <input id="accountnumber" type="number" placeholder="Enter Account Number" ></input>

                    <br></br>
                    <h3>Upload</h3>
                    <input id="evidence" type="file" placeholder="No file uploaded" multiple
                        onChange={(e) => { 
                            let max = e.target.files.length
                            const files = []; const fileNames = []; const fileTypes = []
                            for (var i = 0; i < max; i++){
                                files[i] = e.target.files[i]
                                fileNames[i] = e.target.files[i].name
                                fileTypes[i] = e.target.files[i].type
                            }
                            setMultipleImages(files); 
                            setMultipleImageNames(fileNames)
                            setMultipleImageTypes(fileTypes)
                            setLength(max)
                            }}>
                        </input>
                    <br></br>
                    <input id="uploadfilesbutton" type="button" onClick={() => {  UploadFile(); EnableOnUpload(); }} value={"upload Image"}></input>
                    <br></br>       
                    <br></br>  
                    <input id="submitbutton" type="button" onClick={() => {  SubmitFileCheck(); }} value={"Submit"}></input>
                </div>
            </form>
        </>
    )
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
                { Status() === true ?  <AddClaimPage/> : <LoginSignup/>}
        </div>

    );
}
 
export default viewClaim;