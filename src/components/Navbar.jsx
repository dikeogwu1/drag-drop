import "../styles/navbar.css";
import { Link } from "react-router-dom";
import useLogger from "../utils/hooks/useLogger";

function Navbar() {
  const { loading, data, error } = useLogger(
    "https://hngx-image-server.onrender.com/api/v1/auth/currentUser"
  );
  // loading state
  if (loading) {
    return (
      <nav className='nav'>
        <Link to='/' className='nav_link link'>
          <strong>Drag & Drop</strong>
        </Link>
        <div className='nav_actions'>
          <h4>loading...</h4>
        </div>
      </nav>
    );
  }

  // error state
  if (error || data.length < 1) {
    return (
      <nav className='nav'>
        <Link to='/' className='nav_link link'>
          <strong>Drag & Drop</strong>
        </Link>
        <Link to='/login' className='link'>
          <div className='nav_actions'>
            <button>Login</button>
          </div>
        </Link>
      </nav>
    );
  }

  return (
    <nav className='nav'>
      <Link to='/' className='nav_link link'>
        <strong>Drag & Drop</strong>
      </Link>
      <div className='nav_actions'>
        <strong className='autheticated'>Hello, {data.user.name}</strong>
      </div>
    </nav>
  );
}

export default Navbar;
