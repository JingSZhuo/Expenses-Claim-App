import { useEffect, useState } from "react";
import db from "./firebase";
import logo from './logo.svg';
import './App.css';
import { collection, onSnapshot, getFirestore, getDocs } from "firebase/firestore";


function App() {

  let books = []
  const dbs = getFirestore()
  const colRef = collection(dbs, 'Table1')
  getDocs(colRef)           //Get all from collection
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
  })

  
  // const [test, getTest] = useState([]);
  // useEffect(
  //   () => 
  //     onSnapshot(collection(db, "Table1"), (snapshot) =>   //Connect to the collection
  //       getTest(snapshot.docs.map(doc => ({...doc.data(), i: doc.id})))
  //     ),
  //   []
  // );

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
          Learn React XD
        </a>
        <div></div>
{/*         
        <ul>
          {test.map((testing) => (
            <li key={testing.id}>
                <a>{testing.F1}</a> 
                <a>{testing.F2}</a>
            </li>
          ))}
        </ul> */}
      </header>
    </div>
  );
}

export default App;
