import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState와 유사한 역할
// state 하나를 slice라고 부른다
let user = createSlice({
  name: "user",
  initialState: { name: "cha", age: 20 },

  reducers: {
    changeName(state) {
      //   return { name: "park", age: 20 };
      // 아래와 같이 array/object의 경우 직접 수정해도 state 변경된다. 자동설치된 immer.js 덕분이다.
      state.name = "park";
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});
export let { changeName, increase } = user.actions;

export default user;
