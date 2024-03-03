import axios from "axios";
import {
  ALL_BOLTS_FAIL,
  ALL_BOLTS_REQUEST,
  ALL_BOLTS_SUCCESS,
  BOLT_DETAILS_REQUEST,
  BOLT_DETAILS_FAIL,
  BOLT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/boltConstants";

export const getBolts = (keyword = "", currentPage = 1, selectedFilters = {}) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOLTS_REQUEST });

    // Convert selected filters object into query parameters
    const filtersQuery = Object.entries(selectedFilters)
      .map(([filter, selectedOption]) => `${filter}=${encodeURIComponent(selectedOption)}`)
      .join('&');

    // Append selected filters query parameters to the request URL
    let link = `/aak/l1/bolts?keyword=${keyword}&page=${currentPage}`;
    if (filtersQuery) {
      link += `&${filtersQuery}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_BOLTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BOLTS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getBoltDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOLT_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/bolt/${id}`);

    dispatch({
      type: BOLT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOLT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
