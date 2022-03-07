import { useEffect, useState } from "react";
import db from "./firebase";
import { collection, onSnapshot, getFirestore, 
  getDocs, doc, query, where, getDoc } from "firebase/firestore";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';

//Images
import logo from './images/logo.svg';
//Pages
import './App.css';
import Create1 from "./nextpage.js";


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
        <header className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React XDD
          </a>
          <div>
            {test.map((testing) => {
                  return(
                    <div>
                      <a>Data: {testing.DATA1}</a>
                    </div>
                  );
            })}
          </div>
          <form action="output()">
            <input placeholder="Enter smth..."></input>
            <br></br>
            <button type="submit">Submit</button>
          </form>
          

          <BrowserRouter>
            <Routes>
              <Route path="name1" element={<Create1 />} />
            </Routes>

            <div>
            <Link to="name1" >nextpage</Link>
            </div>
          </BrowserRouter>
        </header>
      </div>

  );
}

export default App;
