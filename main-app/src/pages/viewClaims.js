import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, getDoc ,getDocs, onSnapshot, doc } from "firebase/firestore";

function StatusIn(){


    //Single Document
    const docRef = doc(db, "Employee", "User2")

    onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id)   //shove into useState?? or var then use map?
    })


    const [data, getData] = useState([])
    const usersCollectionRef = collection(db, "Employee")

    useEffect(() => {
      const getData1 = async () => {
        const data_1 = await getDocs(usersCollectionRef);
        getData(data_1.docs.map((doc1) => ({...doc1.data(), id: doc1.id })))
      }
      getData1()
    }, [])
    
    return(
    <>
        <h2>Logged in!</h2>
        <div>
          {data.map((testing) => {
            return (
              <div>
                <a>Data: {testing.Claim1}</a>
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
 
function Status() {
    const  [loginStatus, setLoginStatus] = useState(false)
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {          //Check if user is logged in
      if (user) {
        setLoginStatus(true); console.log("!!!")
      } else {
        setLoginStatus(false); console.log("???")
      }
    })
    
    return loginStatus
  }

const viewClaim = () => {

    return (  
        <body>
            <h1>Claims page</h1>
                { Status() === true ?  <StatusIn/> : <StatusOut/>}
        </body>

    );
}
 
export default viewClaim;