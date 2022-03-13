import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import "../main.css";

function page1() {

    async function addtoDB(){
        const auth3 = getAuth();
        const user = auth3.currentUser;
    
        const createCollection = collection(db, user.email)
        await setDoc(doc(createCollection, "..somedata33"), {
            claim1: "aaaaaaaaa",
            amount: "123.45"
        }) 
    }

    addtoDB()
   

    return( 
        <><h1>Add Claim</h1>
                <input placeholder="Enter some text... "></input>
                <button onClick={page1}>Enter</button>
                

        </>
    )

}

export default page1;