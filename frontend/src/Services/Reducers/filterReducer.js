import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    c: 0,
    specifiedStandard: "",
    certificationStatus: "",
    surfaceFinish: "",
    hotForge: false,
    coldForge: false,
    shade: [],
    coatedMaterial: [],
    brand: "",
    mildSteelGrade: [0, 10],
    alloySteelGrade: [0, 10],
    // Add other filter properties here
  },
};

export const filterreducers = createReducer(initialState, {
  increment: (state) => {
    state.filters.c += 1;
  },

  incrementByValue: (state, action) => {
    state.filters.c += action.payload;
  },

  decrement: (state) => {
    state.filters.c -= 1;
  },

  setFilterValues: (state, action) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    };
  }

});
