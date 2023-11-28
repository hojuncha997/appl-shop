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
  // url의 파라미터 정보가 useParams에 남는다.
  let { id } = useParams();

  // 고유값을 사용하여 shoes배열이 다르게 정렬되더라고 올바른 상품을 보여줄 수 있도록 한다.
  /* 
  슈즈 배열에서 find를 사용하여 id값과 대응되는 요소를 찾는다.
  해당 요소의 타이틀을 가져와 뿌려준다. 
  */
  // let found = props.shoes.find((element) => element.id == id);

  let item = props.shoes.find((element) => {
    return element.id == id;
  });

  if (item === null || item === undefined) {
    return <div>상품이 존재하지 않습니다.</div>;
  } else {
    return (
      <div className="container">
        {/* <YellowBtn bg={"pink"}>버튼</YellowBtn> */}

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
        </div>
      </div>
    );
  }
};
export default DetailPage;
