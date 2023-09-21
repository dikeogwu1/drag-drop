import "../styles/navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";

function Navbar() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // fetch images from the server
  const fetchData = async (url) => {
    setLoading(true);

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getUserFromLocalStorage()}`,
        },
      });

      setLoading(false);
      setData(data);
    } catch (error) {
      setData({});
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData("https://hngx-image-server.onrender.com/api/v1/auth/currentUser");
  }, []);

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
  if (error) {
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
