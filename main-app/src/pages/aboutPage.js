import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function AboutPage() {
  const [loginStatus, setLoginStatus] = useState(false);

  function Status() {
    //Checks if user is logged in and renders based on login status

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //Check if user is logged in
      if (user !== null) {
        setLoginStatus(true); //console.log("TRUE")
      } else {
        setLoginStatus(false); //console.log("FALSE")
      }
    });
    return loginStatus;
  }
  useEffect(() => {
    //run once
    Status();
  }, []);

  const auth = getAuth();
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <html>
      <body class="about-body">
        <nav className="navbar">
          <Link className="navbuttons" to="/">
            Home
          </Link>
          <Link className="navbuttons" to="/about">
            About
          </Link>
          <div class="dropdown">
            <button class="dropbtn">
              Claims <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              {loginStatus === true ? (
                <Link className="navbuttons" to="/viewClaim">
                  View Claims
                </Link>
              ) : (
                <Link className="loginsignupbutton" to="/LoginSignup">
                  View Claims
                </Link>
              )}
              {loginStatus === true ? (
                <Link className="navbuttons" to="/addClaim">
                  Add New Claim
                </Link>
              ) : (
                <Link className="loginsignupbutton" to="/LoginSignup">
                  Add New Claim
                </Link>
              )}
            </div>
          </div>
          {loginStatus === true ? (
            <Link
              className="loginsignupbutton"
              to="/LoginSignup"
              onClick={logout}
            >
              Logout
            </Link>
          ) : (
            <Link className="loginsignupbutton" to="/LoginSignup">
              Login and Sign-Up
            </Link>
          )}
        </nav>
        <div class="divider"></div>

        <div class="about-page">
          <div class="divider"></div>
          <div class="about-border">
            <p class="about-text">
              ClaimIt is a web application to simplify the process of managing
              expense claims for managers and employees
            </p>
          </div>
          <div class="about-border-2">
            <div class="about-border-2-text">
              <p>
                No more hassle of manually submitting and waiting to create an
                expense report
              </p>
              <br></br>
              <p>Track expenses on your business trip</p>
            </div>
            <img src={require("../images/paper.jpg")}></img>
          </div>
          <h1 class="about-title">How to use</h1>
          <div class="htu-container">
            <div class="how-to-use shade">
              <div class="htu-image-container shade-img">
                <img class="htu-image" src={require("../images/step1.png")} />
              </div>
              <h1 class="htu-text htu-text-con">Sign up and get your ClaimIt account</h1>
            </div>
            <img class="arrow down separator" src={require("../images/arrow.png")} />
            <div class="how-to-use shade">
              <h1 class="htu-text htu-text-con"> Hover over the "Claims" button on the navigation bar and choose the "Add New Claim" button</h1>
              <div class="htu-image-container shade-img">
                <img class="htu-image" src={require("../images/step2.png")} />
              </div>
            </div>
            <img class="arrow down separator" src={require("../images/arrow.png")} />
            <div class="how-to-use shade">
              <div class="htu-image-container shade-img">
                <img class="htu-image" src={require("../images/step3.png")} />
              </div>
              <h1 class="htu-text htu-text-con">Fill out the details of the claim you propose to submit</h1>
            </div>
            <img class="arrow down separator" src={require("../images/arrow.png")} />
            <div class="how-to-use shade">
              <h1 class="htu-text htu-text-con">
                View your submitted claim status on the "Pending Claim"
                page
              </h1>
              <div class="htu-image-container shade-img">
                <img class="htu-image" src={require("../images/step4.png")} />
              </div>
            </div>
            <img class="arrow down separator" src={require("../images/arrow.png")}/>
            <img src={require("../images/reimburse.png")} width="350px"></img>
            <h1 class="htu-text-con">Get reimbursed</h1>
          </div>
          <p class="about-text"></p>
          <h1 class="about-title">Features</h1>
          <div class="features-container">
            <ul class="features-list">
              <li>Fill out the details and submit expense claims</li>
              <li>Upload pictures of receipts</li>
              <li>Monitor status of submitted claims</li>
              <li>Review list of submitted claims</li>
              <li>Handle claim approval requests</li>
              <li>Do expenses when you travel</li>
            </ul>
          </div>
        </div>
        <div class="divider"></div>
      </body>
    </html>
  );
}

export default AboutPage;
