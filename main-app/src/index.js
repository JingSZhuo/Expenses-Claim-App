import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Create1 from "./pages/nextpage.js";
import Create2 from "./pages/nextpage2.js";

const rootElement = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>} />             //to keep certain page components persistent throught pages - nest inside App route
              <Route path="name1" element={<Create1 />} />    //Seperate pages with new content
              <Route path="blog" element={ <Create2 /> } />
            </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals