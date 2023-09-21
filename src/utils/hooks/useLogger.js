import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/loggerReducer";
import { ACTIONS } from "../reducers/loggerReducer";
import { getUserFromLocalStorage } from "../localStorage";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

function useLogger(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: ACTIONS.API_REQUEST });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getUserFromLocalStorage()}`,
        },
      });

      dispatch({
        type: ACTIONS.FETCH_DATA,
        payload: data,
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
export default useLogger;
