import { Link } from "react-router-dom";
import img from "../assets/not-found.svg";

function Error() {
  return (
    <div>
      <img src={img} alt='not found' />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/'>
        <button>back home</button>
      </Link>
    </div>
  );
}
export default Error;
