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

      //.findIndex() 함수도 있다. array에서 원하는 원소가 몇 번째인지 확인하는 함수
      // state.findIndex((element) => {return element.id == action.payload})
      // state[번호].count++
    },
    decreaseCount(state, action) {
      let index = state.findIndex((element) => element.id == action.payload);
      let quantity = state[index].count;
      if (quantity == 0 || quantity < 0) {
        state[index].count = 0;
      } else {
        state[index].count--;
      }
    },

    addItemToCart(state, action) {
      console.log("addItemToCart-payload", action.payload);

      // 없으면 -1 반환
      let index = state.findIndex((element) => element.id == action.payload.id);

      if (index == -1) {
        console.log("추가됨");
        state.unshift(action.payload);
      } else {
        console.log("수량만 추가");

        /*
        // increaseCount(state, index);
        Redux Toolkit에서는 reducer 내부에서 다른 reducer 함수를
        직접 호출하는 것은 Redux toolkit에 맞는 패턴이 아니다. 
        따라서 아래처럼 로직을 직접 구현하거나 dispatch해야 한다.*/

        state[index].count++;
      }
      // console.log("index from store", index);

      //   state = [action.payload + state];
      console.log("state", JSON.parse(JSON.stringify(state)));
    },
  },
});
export let { increaseCount, decreaseCount, addItemToCart } = cart.actions;
export default cart;
