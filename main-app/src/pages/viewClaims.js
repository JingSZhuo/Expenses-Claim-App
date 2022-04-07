import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { collection ,getDocs, query, orderBy } from "firebase/firestore";
import {Link} from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Login_Signup from "./LoginSignUp";


    
function ViewClaim(){
    
    //...............................................................................
    const auth = getAuth();
    const user = auth.currentUser;

    const [data, getData] = useState([])
    //console.log(data)
    const usersCollectionRef = collection(db, user.email)
    const sort = query(usersCollectionRef, orderBy("ID", "desc"))

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(sort);
        getData(data_1.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
      getData1()
    }, [])

    const logout = async () => {
      await signOut(auth)
    };

    function showFiles (numberOfFiles, arrayOfURLS) {

      return [...Array(numberOfFiles)].map((e, i) => 
        <div key={i}>
            <embed className="files" src={`${arrayOfURLS[i]}`}/>
            <br></br>
            <center><a href={`${arrayOfURLS[i]}`}>View</a></center>
        </div>);
    }
    
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
        {/* <Link className='loginsignupbutton' to="/editProfile" >Profile</Link>  */}
      </nav>
        <h2>My Claims</h2>

        <div>
          {data.map((data) => {
            //Implement function for ID for each claim?
            return (
              
              <div>
                <a> Time: {data.ID}</a>,
                <a> Claim: {data.Claim}</a>,
                <a> Claim Description: {data.Description}</a>
                <a> Amount: {data.Amount}</a>,
                <a> Amount (GBP): {data.AmountInGBP}</a>,
                <a> Sort Code: {data.SortCode}</a>,
                <a> Account No: {data.AccountNumber}</a>,
                <a> ClaimID: {data.id}</a>,
                <a> Email: {data.email}</a>,
                <a> Status: {data.Approve}</a>
                <br></br>
                <a>Files:</a>
                <br></br>
                <div className="filescontainer">{showFiles(data.NoFiles, data.URLS)}</div>
                <br></br>
                {/* <a href={`${data.URLS}`}>View</a> */}
                {/*<a> URLS: {testing.URLS[0]} , {testing.URLS[1]}</a>*/}
                <br></br>
               {/* , <Link to="/editClaim" state={testing.id} >Edit Claim</Link>*/}
                <br></br>
                
              </div>
            );
          })}
        </div>
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
                { Status() === true ?  <ViewClaim/> : <Login_Signup/>}
        </div>

    );
}
 
export default viewClaim;
