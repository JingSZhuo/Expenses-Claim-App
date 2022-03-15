import { Link,  Outlet } from 'react-router-dom';

//Images

//Pages
import "./main.css"

function App() {

  return (
      <div className="App">

            <nav className="navbar">
              <Link className='navbuttons' to="name1" >new page</Link>
              <Link className='navbuttons' to="LoginSignup" >Login and Sign-Up</Link>
            </nav>

        <h1>Homepage</h1>
            <Outlet/>

      </div>

  );
}

export default App;
