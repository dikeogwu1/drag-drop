import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserToLocalStorage } from "../utils/localStorage";
import Navbar from "../components/Navbar";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://hngx-image-server.onrender.com/api/v1/auth/login",
        { email, password }
      );
      addUserToLocalStorage(data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        toast.error("Invalid credencials");
      }
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <form className='form'>
        <ToastContainer />
        <h2>Login</h2>
        {/* email field */}
        <label htmlFor='userName' className='form_label'>
          user Name
        </label>
        <input
          type='email'
          name='email'
          id='userName'
          autoComplete='off'
          placeholder='Possible value: user@example.com'
          className='form_input'
          value={values.email}
          onChange={handleChange}
        />
        {/* password field */}
        <label htmlFor='password' className='form_label'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Case sensitive possible value: 1Password'
          className='form_input'
          value={values.password}
          onChange={handleChange}
        />
        <button
          type='button'
          className='btn_block'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "loading..." : "Submit"}
        </button>
        <p>Note: you are logging in as Demo User</p>
      </form>
    </>
  );
}
export default Login;
