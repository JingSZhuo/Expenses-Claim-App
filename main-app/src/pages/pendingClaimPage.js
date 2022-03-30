import { collection, collectionGroup, getDocs, query, setDoc, where, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, } from "react";
import { Link } from 'react-router-dom';
import db from "../firebase";

const PendingClaimPage = () => {


    const [data, getData] = useState([])
    const usersCollectionRef = collectionGroup(db, "Employee")

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(usersCollectionRef);
        getData(data_1.docs.map((doc) => ({...doc.data(), id: doc.id })))
      }
      getData1()
    }, [])

    const Approve = async (email, ClaimId) => {
        try{
          console.log("Email: "+email +", ClaimId: " + ClaimId) 
          const collectionRef = collection(db, email)
          await updateDoc(doc(collectionRef, ClaimId), {
            Approve: "Approved!"
          })
        }
        catch (e) {
          console.log(e.message)
        }
    }

    const Reject = async (email, ClaimId) => {
      try{
        console.log("Email: "+email +", ClaimId: " + ClaimId) 
        const collectionRef = collection(db, email)
        await updateDoc(doc(collectionRef, ClaimId), {
          Approve: "Rejected!"
        })
      }
      catch (e) {
        console.log(e.message)
      }
  }
 
    return ( 
        <body>
            <nav className="navbar">
                <Link className='navbuttons' to="/" >Home</Link>
                <Link className='navbuttons' to="/about" >About</Link>
                <Link className='navbuttons' to="/admin" >Admin</Link>
            </nav>

            <h1>CLAIMS TO APPROVE</h1>

            {data.map((data) => {
                return(
                  <body>
                      <div>Claim: {data.Claim} : {data.ClaimId} : {data.Amount} : {data.email} </div>
                      <button onClick={() => Approve(data.email, data.ClaimId)}  value="Approve" >Approve</button>
                      <button onClick={() => Reject(data.email, data.ClaimId)}  value="Approve" >Reject</button>
                  </body>
              
                )
            })}
        </body>
     );
}
 
export default PendingClaimPage;
