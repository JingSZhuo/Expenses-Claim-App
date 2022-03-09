import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//pages
import Create1 from "./pages/nextpage.js";
import LS from "./pages/LoginSignUp.js";
import Claim from "./pages/viewClaims.js"

const rootElement = document.getElementById('root')


function Status() {
  const  [loginStatus, setLoginStatus] = useState(false)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoginStatus(true); console.log("!!!")
    } else {
      setLoginStatus(false); console.log("???")
    }
  })
  
  return loginStatus
}


ReactDOM.render(
  <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />             //to keep certain page components persistent throughout pages - nest inside App route
              <Route path="name1" element={<Create1 />} />    //Seperate pages with new content
              <Route path="LoginSignup" element={ <LS /> } />
              <Route path='claimPage' element={ <Claim/> } />
            </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals