import { Link,  Outlet } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faFileShield, faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';


//Images

//Pages
import "./main.css"
import "./reset.css"

function App() {

  return (
      

      <div className="App">

          <nav className="navbar">
              <Link className='navbuttons' to="/" >Home</Link>
              <Link className='navbuttons' to="/about" >About</Link>
                <div class="dropdown">
                    <button class="dropbtn">Claims
                     <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
                        <Link className='navbuttons' to="/addClaim">Add New Claim</Link>
                    </div>
              </div>
              <Link className='loginsignupbutton' to="/LoginSignup">Login and Sign-Up</Link>
            </nav>

            <div class="divider"></div>

            <div class="home-page-section">
            <h1 class="home-title">ClaimIT</h1> 
            <p class="home-description">Claim expenses with ease.</p>
            </div>


          <div class="divider"></div>

          <div class="card-section">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-text">
                    <FontAwesomeIcon icon={faPlaneArrival} class="icon-img"/>
                    <h1 class="card-title">Travel</h1>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Travel:</h1>
                  <p>Employees can use our simple, interactive app to claim any business travel expenses.</p>
                  <p>Easy for managers to follow and read all claims made by employees.</p>
                  
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-text">
                    <FontAwesomeIcon icon={faFileShield} class="icon-img"/>
                    <h1 class="card-title">Paperless</h1>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Paperless:</h1>
                  <p>No need to carry around countless reciepts. Upload all reciepts when creating an expense claim with ease.</p>
                  
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <div class="card-text">
                    <FontAwesomeIcon icon={faMoneyBillTransfer} class="icon-img"/>
                    <h1 class="card-title">Expense</h1>
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-text card-text-back">
                  <h1>Expense:</h1>
                  <p>Instant claim managing, fast response time between employee and manager.</p>
                  <p>Employees can constantly track the status of pending claims.</p>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>




            <Outlet/>


            

      </div>

  );
}

export default App;
