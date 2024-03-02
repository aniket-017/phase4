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

export const getScrews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SCREWS_REQUEST });

    const { data } = await axios.get("/aak/l1/screws");

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

    const { data } = await axios.get(`/aak/l1/screws/${id}`);

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
