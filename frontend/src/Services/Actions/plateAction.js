import axios from "axios";
import {
  ALL_PLATES_FAIL,
  ALL_PLATES_REQUEST,
  ALL_PLATES_SUCCESS,
  PLATE_DETAILS_REQUEST,
  PLATE_DETAILS_FAIL,
  PLATE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/plateConstants";

export const getPlates = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLATES_REQUEST });

    const { data } = await axios.get("/aak/l1/plates");

    dispatch({
      type: ALL_PLATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PLATES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPlateDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLATE_DETAILS_REQUEST });

    const { data } = await axios.get(`/aak/l1/plates/${id}`);

    dispatch({
      type: PLATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLATE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
