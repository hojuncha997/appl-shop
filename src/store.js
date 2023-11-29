import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState와 유사한 역할
// state 하나를 slice라고 부른다
let user = createSlice({
  name: "user",
  initialState: "cha",

  reducers: {
    // 1. 임의의 state 수정 함수를 생성한다
    changeName(state) {
      //기존 state를 변경하려면 파라미터를 넣어준다.
      return `philip ${state}`;
    },
  },
});
// 2. 만든 함수를 export 한다. actions에는 state변경함수들이 남는다.
export let { changeName } = user.actions;
//이제 만든 함수를 import 해서 사용하면 된다

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  reducer: {
    // 작명: sliceName.reduce (reducer를 꼭 붙여줘야 함)
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
