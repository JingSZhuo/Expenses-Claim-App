import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { useEffect, useState, } from "react";
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
    console.log(data)
    return ( 
        <body>
            <h1>CLAIMS TO APPROVE</h1>

            {data.map((data) => {
                return(
                    <div>Claim: {data.Claim} : {data.ClaimId} : {data.Amount} : {data.email} </div>
                )
            })}
        </body>
     );
}
 
export default PendingClaimPage;
