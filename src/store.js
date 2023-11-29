import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/cartSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    // 작명: sliceName.reduce (reducer를 꼭 붙여줘야 함)
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
