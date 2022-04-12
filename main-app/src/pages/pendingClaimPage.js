import { collection, getDocs, query, doc, updateDoc, orderBy, where } from 'firebase/firestore';
import { useEffect, useState, } from "react";
import { Link } from 'react-router-dom';
import db from "../firebase";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCaretDown, faExpand, faPlus, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { async } from '@firebase/util';
import useCollapse from 'react-collapsed';

const PendingClaimPage = () => {

  const [data, getData] = useState([])
  const  [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {       //run once
    Status()
  }, [loginStatus])

  useEffect(() => {
    const getDataOne = async () => {
      const fetchData = await getDocs(sort);
      getData(fetchData.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getDataOne()
  }, [])



  function Status() {                         //Checks if user is logged in and renders based on login status
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user!== null) {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false);  //console.log("FALSE")
      }
    })
    return loginStatus
  }

  //Signout function
  const auth = getAuth();
  const logout = async () => {
    await signOut(auth)
  };

  const usersCollectionRef = collection(db, "Employee")
  const sort = query(usersCollectionRef, orderBy("ID", "desc"))

  //Showing files for claims
  function showFiles (numberOfFiles, arrayOfURLS) {

    return [...Array(numberOfFiles)].map((e, i) => 
      <div key={i}>
          <embed className="files"  src={`${arrayOfURLS[i]}`}/>
          <a class="view-button" href={`${arrayOfURLS[i]}`}><FontAwesomeIcon icon={faExpand}></FontAwesomeIcon></a>
      </div>);
  }
 
    return ( 
      <body class="pendingClaim-body">
        <div>
            <nav className="navbar">
                {/* <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link> */}
                <Link className='navbuttons active-page' to="/pendingClaim" >Admin</Link>
                <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
            </nav>
            <h1 className="ClaimApprove">Pending Claims</h1>
            <div className="main-Pendingclaim-container">
            {data.map((data) => {
                return(
                  <div className="ManagerClaim">
                      <div className="MainClaim2">
                          <div className="filescontainer1">{showFiles(data.NoFiles, data.URLS)}</div>

                            <a className = "claim-name1"> Claim: {data.Claim}</a>
  
                            <a className = "claim-amount1"> Amount: £{data.Amount}</a>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <Collapsible accountNumber={`${data.AccountNumber}`} sortCode={`${data.SortCode}`} datetime={`${data.ID}`} Description={`${data.Description}`} ClaimID={`${data.id}`} Email={`${data.email}`} NoOfFiles={`${data.NoFiles}`}/>
                      </div>
                      
                      <ApproveRejectButton className="ApproveReject" email={`${data.email}`} ClaimId={`${data.ClaimId}`} ClaimIdAdmin={`${data.ClaimIdAdmin}`} />
                      {/* <button id='approve' className='finalchoice' onClick={() => {Approve(data.email, data.ClaimId, data.ClaimIdAdmin); }}  value="Approve" >Approve</button>
                      <button id='reject' className='finalchoice' onClick={() => {Reject(data.email, data.ClaimId, data.ClaimIdAdmin); }}  value="Reject" >Reject</button> */}
                  </div>
                  
                )
            })}
            </div>
        </div>
        
        </body>
     );
}

//For the collapse button
function Collapsible(props){

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (

      <div className="collapsible2">
          <div className="collapse-btn2" {...getToggleProps()}>
              {isExpanded ? <FontAwesomeIcon  icon={faAngleUp}></FontAwesomeIcon> : <FontAwesomeIcon  icon={faAngleDown}></FontAwesomeIcon>}
          </div>
          <div {...getCollapseProps()}>
              <div className="content2">
              <br></br>
              <p>Account number: {props.accountNumber}</p>
              <br></br>
              <p>Sort code: {props.sortCode}</p>
              <br></br>
              <p>Time Submitted:  {props.datetime}</p>
              <br></br>
              <p>Claim Description: {props.Description}</p>
              <br></br>
              <p>Claim ID: {props.ClaimID}</p>
              <br></br>
              <p>Email: {props.Email}</p>
              <br></br>
              <p>No. of Files: {props.NoOfFiles}</p>
              </div>
          </div>
      </div>
      );
}
//Approve/reject function buttons

function OnPressChoice(x, y) {
  document.getElementById(`${x}`).disabled = true
  document.getElementById(`${y}`).disabled = true
}
function OnPressChoiceTwo(x, y) {
  document.getElementById(`${x}`).disabled = true
  document.getElementById(`${y}`).disabled = true
}


function ApproveRejectButton (props) {
  return(
    <div class="MainClaim2">
        <button id={`${props.ClaimId}`} className='finalchoiceApprove' onClick={() => {Approve(props.email, props.ClaimId, props.ClaimIdAdmin); OnPressChoice(props.ClaimId, props.ClaimIdAdmin) }}  >Approve</button>
        <button id={`${props.ClaimIdAdmin}`} className='finalchoiceReject' onClick={() => {Reject(props.email, props.ClaimId, props.ClaimIdAdmin); OnPressChoiceTwo(props.ClaimIdAdmin, props.ClaimId) }}  >Reject</button>
    </div>
  )
}

const Approve = async (email, ClaimId, ClaimIdAdmin) => {
  try{
    console.log("Email: "+email +", ClaimId: " + ClaimId) 
    const collectionRef = collection(db, email)
    const collectionRefLineManager = collection(db, "Employee")

    await updateDoc(doc(collectionRef, ClaimId), {
      Approve: "Approved"
    })
    await updateDoc(doc(collectionRefLineManager, ClaimIdAdmin), {
      Approve: "Approved"
    })
    //OnPressChoice()
    alert("Approved Claim")
  }
  catch (e) {
    console.log(e.message)
  }
}

const Reject = async (email, ClaimId, ClaimIdAdmin) => {
try{
  console.log("Email: "+email +", ClaimId: " + ClaimId) 
  const collectionRef = collection(db, email)
  const collectionRefLineManager = collection(db, "Employee")

  await updateDoc(doc(collectionRef, ClaimId), {
    Approve: "Rejected"
  })
  await updateDoc(doc(collectionRefLineManager, ClaimIdAdmin), {
    Approve: "Rejected"
  })
 // OnPressChoice()
  alert("Rejected Claim")
}
catch (e) {
  console.log(e.message)
}
}



function StatusOut() {
  return(<h2></h2>)
}

function Status() {                         //Checks if user is logged in and renders based on login status
  const  [loginStatus, setLoginStatus] = useState(false)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {          //Check if user is logged in
    if (user.email === "linemanager@gmail.com") {
      setLoginStatus(true); //console.log("TRUE")
    } else {
      setLoginStatus(false);  //console.log("FALSE")
    }
  })
  return loginStatus
}

const viewClaim = () => {

  return (  
      <div>
              { Status() === true ?  <PendingClaimPage/> : <StatusOut/>}
      </div>

  );
}

export default viewClaim;
