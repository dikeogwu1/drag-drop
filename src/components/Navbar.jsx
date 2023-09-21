import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='nav_link link'>
        <strong>Drag & Drop</strong>
      </Link>

      <div className='nav_actions'>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
