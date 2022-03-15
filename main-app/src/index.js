import React, { } from 'react';
import ReactDOM from 'react-dom';
import App from './Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import Create1 from "./pages/nextpage.js";
import LS from "./pages/LoginSignUp.js";
import Claim from "./pages/viewClaims.js"
import AddClaim from "./pages/addClaim.js";

const rootElement = document.getElementById('root')


ReactDOM.render(
  <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />             //to keep certain page components persistent throughout pages - nest inside App route
              <Route path="name1" element={<Create1 />} />    //Seperate pages with new content
              <Route path="LoginSignup" element={ <LS /> } />
              <Route path='claimPage' element={ <Claim/> } />
              <Route path='addClaim' element={ <AddClaim/> } />
            </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals