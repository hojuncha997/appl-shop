import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

const CartPage = () => {
  // (state) => {return state} 일반적으로 이렇게 적어놓고 시작한다.
  // 위는 Redux 만든 사람이 정한 규칙이다.
  // a는 state의 모든 state가 저장된다.
  // 만약 let a = useSelector((state) => {return state.user}) 했다면
  // a에는 user에 해당하는 값만 저장된다. //cha
  //   let a = useSelector((state) => {
  //     return state;
  //   });
  //   console.log(a); //{user: 'cha', stock: Array(3)}
  //   console.log(a.user); // cha
  //   console.log(a.stock[0]); // 10
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);

  //store.js에 요청을 보내는 함수이다.
  //dispatch(state변경함수()) 이렇게 사용해야 한다.
  //dispatch(stateName())
  let dispatch = useDispatch();
  console.log(cart);

  return (
    <div>
      {user}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((element, index) => {
            console.log(element);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.count}</td>
                <td>
                  <button
                    onClick={() => {
                      //여기서 실행하는 것이 아니다. store.js로 메시지만 보낸다
                      dispatch(changeName());
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default CartPage;

/*
<tr> 넣으면 행 하나 생김
<th>, <td> 넣으면 열 하나 생김

<thead>와 <tbody>가 없어도 행렬은 생긴다.
그러나 써주는 게 좋다.

장바구니 데이터를 state에 보관해 주고 데이터 바인딩.
그런데 만약 그 데이터가 App, DetailPage, CartPage 모두 필요하다면,
App에서 만들어야 한다.

그런데 그렇게 하면 Props를 계속 넘겨줘야 하고 이는 번거롭다.

Redux라는 라이브러리를 사용하면 컴포넌트들이 props 없이도
state를 공유할 수 있다.

1.redux를 사용하면 js 파일을 하나 만들고 거기에 스테이트들을
보관해 둘 수 있다.

2. 모든 컴포넌트들이 거기에 있는 state들을 가져와서 사용할 수 있다.

따라서 규모가 큰 앱에서는 대부분 redux를 사용한다.






*/
