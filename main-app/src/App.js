import { useEffect, useState } from "react";
import db from "./firebase";
import { collection, onSnapshot, getFirestore, 
  getDocs, doc, query, where, getDoc } from "firebase/firestore";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';

//Images
import logo from './images/logo.svg';
//Pages
import './App.css';

function App() {

  // onSnapshot(doc(db, "User1", "Claim2"), (doc) => {
  //     console.log("Current data:  ", doc.data());
  // });
  
  const [test, setTest] = useState([]);
  const usersCollectionRef = collection(db, "User1")
  //const specificQuery = query(usersCollectionRef, where("DATA3", "==", true))   //Useful for filtering

  useEffect(() => {
    const getTest = async () => {
      const data_1 = await getDocs(usersCollectionRef);
      setTest(data_1.docs.map((doc1) => ({...doc1.data(), id: doc1.id })));
    };
    getTest();
  }, []);

  return (
      <div className="App">
        
          {/* <div>
            {test.map((testing) => {
                  return(
                    <div>
                      <a>Data: {testing.DATA1}</a>
                    </div>
                  );
            })}
          </div> */}

            <nav>
              <Link to="name1" >next page</Link>
              <Link to="blog" >blog</Link>
            </nav>
            <Outlet/>

      </div>

  );
}

export default App;
