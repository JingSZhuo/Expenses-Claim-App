import { Link,  Outlet } from 'react-router-dom';

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
              <Link className='navbuttons' to="/viewClaim" >View Claims</Link>
              <Link className='navbuttons' to="/LoginSignup" >Login and Sign-Up</Link>
            </nav>

        <h1>Homepage</h1>
            <Outlet/>

      </div>

  );
}

export default App;
