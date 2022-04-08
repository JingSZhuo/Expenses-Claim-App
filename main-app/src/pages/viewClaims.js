import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { collection ,getDocs, query, orderBy } from "firebase/firestore";
import {Link} from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown, faExpand, faPlus, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import Login_Signup from "./LoginSignUp";
import useCollapse from 'react-collapsed';




    
function ViewClaim(){
    //...............................................................................

    const auth = getAuth();
    const user = auth.currentUser;

    const [data, getData] = useState([])
    //console.log(data)
    const usersCollectionRef = collection(db, user.email)
    const sort = query(usersCollectionRef, orderBy("ID2", "desc"))

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
            <a class="view-button" href={`${arrayOfURLS[i]}`}><FontAwesomeIcon icon={faExpand}></FontAwesomeIcon></a>
        </div>);
    }

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    
    return(
    <body class="viewClaim-body">

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

      <div class="view-claim-header">
        <h1 class="claim-name">Claims</h1>
        <Link className="new-claim" to="/addClaim"><FontAwesomeIcon class="claim-plus" icon={faPlus}></FontAwesomeIcon>New Expense</Link>
        </div>


        <div class="main-claim-container">
          {data.map((data) => {
            //Implement function for ID for each claim?
            return (
              
              <div class="claim-container">
                
                <div className="filescontainer">{showFiles(data.NoFiles, data.URLS)}</div>
                <div class="claim-text">
                <h1 class="claim-name">{data.Claim}</h1>
                <a class="claim-amount"> {data.Amount}</a>
                <a class={(data.Approve == 'Not Yet Approved') ? "claim-status-pending" : data.Approve == 'Rejected' ?"claim-status-rejected" : "claim-status-Approved"}>{data.Approve}</a>
                <a class="claim-purchaseplace">Spent at {data.Description} - </a>
                </div>

                <div className="collapsible">
                    <div className="collapse-btn" {...getToggleProps()}>
                        {isExpanded ? <FontAwesomeIcon  icon={faAngleUp}></FontAwesomeIcon> : <FontAwesomeIcon  icon={faAngleDown}></FontAwesomeIcon>}
                    </div>
                    <div {...getCollapseProps()}>
                        <div className="content">
                        <p>Account number: {data.AccountNumber}</p>
                        <br></br>
                        <p>Sort code: {data.SortCode}</p>
                        <br></br>
                        <p>Time Submitted: {data.ID}</p>
                        </div>
                    </div>
                </div>

              </div>
            );
          })} 
        </div>
    </body>
              /*<a> Time: {data.ID}</a>,
                <a> Claim: {data.Claim}</a>,
                <a> Claim Description: {data.Description}</a>
                <a> Amount: {data.Amount}</a>,
                <a> Amount (GBP): {data.AmountInGBP}</a>,
                <a> Sort Code: {data.SortCode}</a>,
                <a> Account No: {data.AccountNumber}</a>,
                <a> ClaimID: {data.id}</a>,
                <a> Email: {data.email}</a>,
                <a> Status: {data.Approve}</a>
                 */
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
            { Status() === true ?  <ViewClaim/> : <Login_Signup/>}
        </div>

    );
}
 
export default viewClaim;
