import { Table } from "react-bootstrap";

const CartPage = () => {
  return (
    <div>
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
          <tr>
            <td>1</td>
            <td>안녕</td>
            <td>안녕</td>
            <td>안녕</td>
          </tr>
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
