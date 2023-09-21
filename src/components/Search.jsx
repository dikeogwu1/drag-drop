import "../styles/search.css";
import SearchIcon from "../components/svg/Search";
import useDispatch from "../utils/hooks/useFetch";
import { useState } from "react";

function Search({ items, setItems }) {
  const { loading, data, error } = useDispatch(
    "https://hngx-image-server.onrender.com/api/v1/image"
  );
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItems = [...data];
    const filter = newItems.filter((item) => item.tag === value);
    setItems(filter);
  };

  return (
    <form className='nav_search' onSubmit={handleSubmit}>
      <input
        type='text'
        className='nav_input'
        placeholder='collection, e.g, newbie, beginner, advance'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        autoComplete='false'
      />
      <button type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
}

export default Search;
