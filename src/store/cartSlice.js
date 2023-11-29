import { configureStore, createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      //   console.log("state.cart.initialState", state.cart.initialState); 틀린 표현
      let item = state.find((element) => {
        return element.id == action.payload;
      });

      //   console.log("item", item); //이렇게 하면 proxy 객체라서 값이 제대로 표시되지 않는다. 아래처럼 해줘야 한다.
      console.log("item", JSON.parse(JSON.stringify(item))); //{id: 2, name: 'Grey Yordan', count: 1}

      if (item) {
        item.count += 1;
      }
    },
    addItemToCart(state, action) {
      console.log("addItemToCart-payload", action.payload);
      state.unshift(action.payload);
      //   state = [action.payload + state];
      console.log("state", JSON.parse(JSON.stringify(state)));
    },
  },
});
export let { increaseCount, addItemToCart } = cart.actions;
export default cart;
