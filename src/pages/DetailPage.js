import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "pink" ? "brown" : "black")};
//   padding: 10px;
//   height: 50px;
//   witdh: 50px;
// `;

const DetailPage = (props) => {
  let [count, setCount] = useState(0);
  let [alertBox, setAlertBox] = useState(true);

  useEffect(() => {
    // 마운트 또는 업데이트 시 타이머 시작
    setTimeout(() => {
      let timerId = setAlertBox((currentState) => (currentState = false));
      // setAlert((currentState) => !currentState); 이 코드는 작동X

      // useEffect의 return은 useEffect 동작 전에 실행된다. clean up function이라고 한다
      return () => {
        clearTimeout(timerId);
        /* clean up function: 
            재렌더링시 기존 코드가 남아있거나 충돌하는 경우를 방지하기 위해서 사용.
            기존 useEffect를 청소한다. 여기서는 타이머가 여러 개 생기는 것을 방지하기 위해
            재렌더링 시 타이머를 제거한다.
            기존 코드 제거시에 자주 사용.
            - 타이머
            - 데이터로 데이터 요청 시

            clean up function은 컴포넌트 mount시 실행되지 '않'고, unmout시 실행된다.
        */
      };
    }, 2000);
  }, []);

  // url의 파라미터 정보가 useParams에 남는다.
  let { id } = useParams();

  // 고유값을 사용하여 shoes배열이 다르게 정렬되더라고 올바른 상품을 보여줄 수 있도록 한다.
  /* 
  슈즈 배열에서 find를 사용하여 id값과 대응되는 요소를 찾는다.
  해당 요소의 타이틀을 가져와 뿌려준다. 
  */
  // let found = props.shoes.find((element) => element.id == id);

  let [num, setNum] = useState("");

  // useEffect(() => {
  //   Array.from(quantityInput).map((char, index) => {
  //     if (isNaN(char) || char === " ") {
  //       // 숫자가 아니거나 공백인 경우
  //       alert("문자 넣지마");
  //     }
  //   });
  // }, [quantityInput]);
  useEffect(() => {
    if (isNaN(num) == true) {
      alert("그러지마세요");
    }
  }, [num]);

  let item = props.shoes.find((element) => {
    return element.id == id;
  });

  if (item === null || item === undefined) {
    return <div>상품이 존재하지 않습니다.</div>;
  } else {
    return (
      <div className="container">
        {alertBox == false ? null : (
          <div className="alert alert-warning">2초 내 구매 시 할인</div>
        )}

        {/* <YellowBtn bg={"pink"}>버튼</YellowBtn> */}
        <button onClick={() => setCount((prevCount) => (prevCount += 1))}>
          버튼
        </button>
        {count}
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{item.title}</h4>
            {/* url파라미터를 인덱스 값에 넣어줘야 한다. 
            url파라미터를 넣어주기 위해 useParams 훅을 사용할 수 있다.*/}

            <p>상품설명</p>
            <p>120000원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>

          <input onChange={(e) => setNum(e.target.value)} />
        </div>
      </div>
    );
  }
};
export default DetailPage;
