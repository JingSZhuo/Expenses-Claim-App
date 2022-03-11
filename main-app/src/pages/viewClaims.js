import { useEffect, useState, } from "react";
import db from "../firebase";
import { onAuthStateChanged, getAuth} from "firebase/auth";
import { collection, getDoc ,getDocs, doc } from "firebase/firestore";
    
// async function CallData() {
//   //Single Document
//   const docRef = doc(db, "Employee", "User1")
//   const docSnap = await getDoc(docRef)

//   return docSnap.data()
// }

function StatusIn(){

    // const [fetchData, fetchAllData] = useState([])
    
    async function CallData() {

      //Single Document
      const docRef = doc(db, "EMP", "xyz@gmail.com")
      const docSnap = await getDoc(docRef) 
    
      console.log("Data: ",docSnap.data())

      //fetchAllData(docSnap.docs.map((doc2) => ({...doc2.data(), id: doc2.id})))
    }
    CallData()
    
    //...............................................................................
    const auth2 = getAuth();
    const user2 = auth2.currentUser;

    const [data, getData] = useState([])
    const usersCollectionRef = collection(db, user2.email)

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
                <a>, {testing.Amount}</a>
                <a>, £{testing.VAT}</a>
              </div>
            );
          })}
        </div>
        <></>
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
            <h1>Claims page</h1>
                { Status() === true ?  <StatusIn/> : <StatusOut/>}
        </div>

    );
}
 
export default viewClaim;