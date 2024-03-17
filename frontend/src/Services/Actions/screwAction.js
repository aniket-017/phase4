import axios from "axios";
import {
  ALL_SCREWS_FAIL,
  ALL_SCREWS_REQUEST,
  ALL_SCREWS_SUCCESS,
  SCREW_DETAILS_REQUEST, 
  SCREW_DETAILS_FAIL,
  SCREW_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/screwConstants";




export const getScrews = (keyword = "", currentPage = 1, selectedFilters = {}) => async (dispatch) => {
  try {
    
    dispatch({ type: ALL_SCREWS_REQUEST });

    // Convert selected filters object into query parameters
    const filtersQuery = Object.entries(selectedFilters)
      .map(([filter, selectedOption]) => `${filter}=${encodeURIComponent(selectedOption)}`)
      .join('&');

    // Append selected filters query parameters to the request URL
    let link = `/aak/l1/screws?keyword=${keyword}&page=${currentPage}`;
    if (filtersQuery) {
      link += `&${filtersQuery}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_SCREWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCREWS_FAIL,
      payload: error.response.data.message,
    });
  }
};






export const getScrewDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCREW_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/screw/${id}`);

    dispatch({
      type: SCREW_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCREW_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
