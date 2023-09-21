export const ACTIONS = {
  API_REQUEST: "api-request",
  FETCH_DATA: "fetch-data",
  ERROR: "error",
};

const reducer = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.API_REQUEST:
      return { ...state, loading: true };
      break;
    case ACTIONS.FETCH_DATA:
      return { ...state, loading: false, data: actions.payload };
      break;
    case ACTIONS.ERROR:
      return { ...state, loading: false, data: [], error: actions.payload };
      break;
    default:
      return state;
  }
};

export default reducer;
