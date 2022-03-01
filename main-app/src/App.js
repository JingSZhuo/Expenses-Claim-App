import { useEffect, useState } from "react";
import db from "./firebase";
import logo from './logo.svg';
import './App.css';
import { collection, onSnapshot } from "firebase/firestore";

function App() {

  const [test, setTest] = useState([]);

  useEffect(
    () => 
      onSnapshot(collection(db, "test"), (snapshot) => 
        setTest(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      ),
    []
  );

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
          Learn React
        </a>
        <ul>
          {test.map((testing) => (
            <li key={testing.id}>
                <a>{testing.F1}</a> 
                <a>{testing.F2}</a>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
