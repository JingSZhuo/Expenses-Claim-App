import { collection, getDocs, query, doc, updateDoc, orderBy, where } from 'firebase/firestore';
import { useEffect, useState, } from "react";
import { Link } from 'react-router-dom';
import db from "../firebase";
import { onAuthStateChanged, getAuth, signOut} from "firebase/auth";
import { async } from '@firebase/util';

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
      </div>);
  }
 
    return ( 
        <div>
            <nav className="navbar">
                {/* <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link> */}
                <Link className='navbuttons active-page' to="/pendingClaim" >Admin</Link>
                <Link className='loginsignupbutton' to="/LoginSignup" onClick={logout} >Logout</Link> 
            </nav>
            <h1>CLAIMS TO APPROVE</h1>

            {data.map((data) => {
                return(
                  <div className="ManagerClaim">
                      <div>
                          <a> Time Submitted: {data.ID} </a>,
                          <a> Claim: {data.Claim}</a>,
                          <a> Claim Description: {data.Description}</a>
                          <a> Amount: £{data.Amount}</a>,
                          <a> Sort Code: {data.SortCode}</a>,
                          <a> Account No: {data.AccountNumber}</a>,
                          <a> Email: {data.email}</a>,
                          <a> ClaimID: {data.id}</a>,
                          {/* <a> Status: {data.Approve}</a> */}
                          <br></br>
                          <a> No. of Files: {data.NoFiles}</a>
                          <br></br>
                          <br></br>
                          <div className="filescontainer">{showFiles(data.NoFiles, data.URLS)}</div>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                      </div>
                      <ApproveRejectButton email={`${data.email}`} ClaimId={`${data.ClaimId}`} ClaimIdAdmin={`${data.ClaimIdAdmin}`} />
                      {/* <button id='approve' className='finalchoice' onClick={() => {Approve(data.email, data.ClaimId, data.ClaimIdAdmin); }}  value="Approve" >Approve</button>
                      <button id='reject' className='finalchoice' onClick={() => {Reject(data.email, data.ClaimId, data.ClaimIdAdmin); }}  value="Reject" >Reject</button> */}
                  </div>
                )
            })}
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
    <div>
        <button id={`${props.ClaimId}`} className='finalchoice' onClick={() => {Approve(props.email, props.ClaimId, props.ClaimIdAdmin); OnPressChoice(props.ClaimId, props.ClaimIdAdmin) }}  >Approve</button>
        <button id={`${props.ClaimIdAdmin}`} className='finalchoice' onClick={() => {Reject(props.email, props.ClaimId, props.ClaimIdAdmin); OnPressChoiceTwo(props.ClaimIdAdmin, props.ClaimId) }}  >Reject</button>
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
  return(<h2>Not Admin!!!</h2>)
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
