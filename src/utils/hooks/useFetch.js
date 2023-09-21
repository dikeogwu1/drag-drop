import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/fetchReducer";
import { ACTIONS } from "../reducers/fetchReducer";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: ACTIONS.API_REQUEST });

    try {
      const res = await axios.get(url);
      dispatch({
        type: ACTIONS.FETCH_DATA,
        payload: res.data.image,
      });
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return state;
}
export default useFetch;
