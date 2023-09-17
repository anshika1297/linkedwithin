import { SET_LODING_STATUS, GET_ARTICLES } from "../Actions/actionType";
export const initState = {
  articles: [],
  loading: false,
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_LODING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    default:
      return state;
  }
};

export default articleReducer;
