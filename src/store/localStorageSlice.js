import { createSlice } from "@reduxjs/toolkit";

let localStrg = createSlice({
  name: "localStrg",
  initialState: JSON.parse(localStorage.getItem("watched")),
  reducers: {
    getWatchedList(state, action) {
      //   console.log("state.cart.initialState", state.cart.initialState); 틀린 표현
    },
  },
});
export let { getWatchedList } = localStrg.actions;
export default localStrg;
