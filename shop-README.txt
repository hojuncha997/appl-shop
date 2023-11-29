1. React-Bootstrap 라이브러리 설치

npm install react-bootstrap bootstrap
App.js에 import 'bootstrap/dist/css/bootstrap.min.css';

또는 /public/index.html에 아래 코드 기재

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>

여기서는 후자의 방법 사용


2. 이미지 파일 삽입.
2-1. css파일에서 설정하기
.main-bg{
  height: 300px;
  background-image: url('./img/eastern-promise.jpg'); //src/img/~
  /* 사진의 기준점을 중앙으로 */
  background-position: center;
}

2-2. html에서 삽입하는 경우
import img파일명 from './img/bg.png
<div className="main-bg" style={{backgroundImage: 'url('+ img파일명 +')'}}></div>

3. public 폴더에 정적 자원 저장하고 사용하기
빌드하고 번들링 될 때 src 내부의 파일들은 최소화되면서 이름이 변할 수 도 있다.
그러나 public 디렉토리는 그렇게 되지 않는다. 따라서 public 을 사용해 볼 수 있다.
public 디렉토리의 이미지를 사용할 때는 그냥 "/이미지경로" 를 써주면 된다.
public 사용시 유의점.

사이트 배포 시 하위 경로에서 public의 자원을 사용할 때는, 그 "/이미지경로" 앞에
앞선 경로를 적어줘야할 수도 있다. 번거롭기 때문에 아래와 같이 사용하기를 권장한다.
<img src={process.env.PUBLIC_URL + 'logo192.png'} width="80%">

3. 라우터(세팅과 기본 라우팅)

원래는 컴포넌트 만들어서 상세페이지에 내용을 채운다.
/detail 경로 접근 시 해당 컴포넌트를 보여준다.

react-router-dom을 사용하면 라우팅을 쉽게 할 수 있다.

3-1.react-router-dom 설치

npm install react-router-dom@6

src/index.js에 가서 
import {BrowserRouter} from "react-router-dom";
<BrowserRouter>로 <App/>을 감싸준다.

App.js 이동
import { Routes, Route, Link } from "react-router-dom";
...
return (
    <div className="App">
      <Routes>
        <Route path="/detail" element={<div>상세페이지</div>} />
        <Route path="/detail" element={<DetailPage>} />
      </Routes>

Route는 접근 path와 element를 props로 받는다. 그래서 접근 시 넘겨준다.
그런데 이렇게 하니까 페이지를 이동해도 밑에 남아있는 코드는 그대로다.
따라서 아래와 같이 element에 기존 페이지 구성을 빼주었다.
<Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              {/* 이미지 삽입 */}
              <div className="main-bg"></div>
              {/* 부트스트랩 그리드 사용*/}
              <div className="container">
                <div className="row">
                  {shoes.map((item, index) => {
                    return (
                      <Card imgUrl={urlList[index]} product={shoes[index]} />
                    );
                    // return <Card index={index} product={shoes[index]} 도 고려 가능. src는 컴포넌트에 고정/>;
                  })}
                </div>
              </div>
            </>
          }
        />
        <Route path="/detail" element={<div>상세페이지</div>} />
      </Routes>

이렇게 되면 디테일 페이지 이동 시 기존 화면은 보이지 않게 된다.
그러나 이렇게 하면 코드가 너무 지저분해지기 때문에, 페이지를 컴포넌트로 만들어서
컴포넌트 명으로 넣어주는 것이 편리하다.

링크 사용해서 페이지 이동
<Link to="/home">홈</Link>
<Link to="/detail">상세페이지 </Link>

4. useNavigate, Outlet의 사용
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";


useNavigate안에는 함수가 들어있는데 그 함수가 페이지 이동에 용이하다
let navigate = useNavigate(); 
그리고 아래와 같이 사용한다.
<Nav.Link onClick={() => {navigate("/detail");}}>Detail</<Nav.Link>
Detail을 누르면 /detail로 이동한다.

<Nav.Link onClick={() => {navigate(-1);}}
              // 1은 앞으로 1페이지
              // -2은 뒤로 2페이지
            >
              뒤로 가기
</Nav.Link>

404페이지 만들기
        <Route path="*" element={<div>404</div>} />


5. NestedRoutes

        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/member" element={<AboutPage />} />
        <Route path="/about/location" element={<AboutPage />} />

React Router에서 /about/member와 /about/location 경로가 404 페이지를 
띄우는 문제는 경로 매칭 방식과 관련이 있을 수 있다. 
React Router v6에서는 라우트 매칭이 기본적으로 '정확한 일치(exact match)'를
기반으로 하기 때문에, 경로가 정확히 일치하지 않으면 해당 라우트로 이동하지 않는다.

문제를 해결하기 위해, NestedRoutes를 사용할 수 있다.
/about, /about/member, /about/location 등의 경로에 대해 중첩 라우팅(nested routing)을 사용할 수 있다.

<Route path="/about" element={<AboutPage />}>
    <Route path="member" element={<div>멤버</div>} />
    <Route path="location" element={<div>로케</div>} />
</Route>

장점은 접근 시에 element를 2개 보여줄 수 있다는 것이다.
그러나 막상 /about/member로 접근해도 AboutPage만 보일 뿐,
<div>멤버</div>는 보이지 않는다. 

nested route된 element는 부모 라우터의 내부에서 <Outlet>을 사용하여 위치를 정해줘야 보여진다.

import { Outlet } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  );
};
export default AboutPage;

이러면 <Outlet> 자리에 해당 컴포넌트의 내용이 보이게 된다.
nested routes는 이렇듯 여러 개의 유사한 페이지가 필요할 때 사용된다.
Route로 ui를 구성하면 뒤로가기 버튼을 잘 이용할 수 있다.
페이지 이동도 용이하다.


6. URL 파라미터로 여러 개의 상세페이지 만들기
    <Route path="/detail/1" element={<DetailPage shoes={shoes} />} />
    <Route path="/detail/2" element={<DetailPage shoes={shoes} />} />

    양이 많아지면 위처럼 나열할 수는 없다.
    때문에 URL 파라미터를 사용하여 해결한다.

    <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />


그리고 해당 컴포넌트에서 useParams 훅을 가져와서 사용한다.


import { useParams } from "react-router-dom";

const DetailPage = (props) => {
  // url의 파라미터 정보가 useParams에 남는다.
  let { id } = useParams();
  console.log(id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          {/* url파라미터를 인덱스 값에 넣어줘야 한다. 
          url파라미터를 넣어주기 위해 useParams 훅을 사용할 수 있다.*/}

          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;

참고:
url파라미터는 아래처럼도 사용할 수 있다.
    <Route path="/detail/:id/fdasfas/:exmple/ ...
    <Route path="/detail/:id/:exmple/...

params에 이상한 값을 입력하여 들어올 수도 있는데,
이는 조건문을 사용하여 막아줄 수 있다.

만약 shoes 배열의 순서가 바뀐다면, 그에 따라 보여지는 값이 바뀔 수 있다.
이럴 때는 index가 아닌 고유값을 사용한다면 원래의 값을 보여줄 수 있다.

7. JS 배열의 .find 함수와 .filter함수

.find()
.find() 메서드는 주어진 테스트 함수를 만족하는 배열의 첫 번째 요소를 반환한다.
만약 어떤 요소도 조건을 만족하지 않으면 undefined를 반환한다.
.find()는 주로 단일 요소를 찾을 때 사용된다.

.filter()
.filter() 메서드는 주어진 함수를 만족하는 모든 요소로 새 배열을 만들어 반환한다.
조건을 만족하는 요소가 없으면 빈 배열을 반환한다.
.filter()는 조건을 만족하는 여러 요소를 찾을 때 사용된다.



8. styled-component 사용

8-1. styled-component 설치
npm install styled-component

8-2. styled-component 사용
import styled from 'styled-components'

styeld 컴포넌트를 사용하면 className과 css파일을 사용하지 않아도 된다.
js파일 내에서 전부 해결 가능하다.

아래와 같이 사용할 수 있다.

// 실제로는 컴포넌트다. 백틱 사용
let YellowButton= styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`


8-3. styeld-component의 장점

1. 이를 활용하면 css파일을 만들지 않아도 된다.
2. 따라서 다른 JS 파일을 오염시키지 않는다.
3. 로딩시간이 단축된다. => 해당 HTML의 style에 넣어주기 때문. 또한 css파일을 전부 가져오지 않기 때문에
   해당 페이지에만 필요한 css만 로딩 되기 때문

번들링 시 css파일도 합쳐지게 되는데 그 떄 오염이 될 가능성이 있다.
만약 '컴포넌트.module.css' 이렇게 파일명을 붙이면 해당 파일이 해당 컴포넌트에만 대응되므로
styled-component를 사용하지 않아도 오염이 되지 않는다.

비슷한 스타일을 만들기 위해서 styled-component에 props를 전달할 수도 있다.

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
  height: 50px;
  witdh: 50px;
`;
...
<YellowBtn bg={"pink"}>버튼</YellowBtn>

이렇게 사용한다.

4. 아래와 같이 간단한 프로그래밍도 가능하다.

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "pink" ? "brown" : "black")};
  padding: 10px;
  height: 50px;
  witdh: 50px;
`;

5. 기존에 만들었던 스타일을 복사하여 사용할 수도 있다.
let NewBtn = styled.button(YellowBtn)`
  padding: 10px;
  ...
`

8-4. styeld-component의 단점
1. js파일이 매우 복잡해진다.
2. 다른 파일에서 style을 재사용하고 싶은 경우 import/export하여 쓰는데,
    이는 기존의 css파일 사용 방법과 다르지 않다.
3. 협업 시 CSS 담당하는 사람이 코드를 못 알아볼 수도 있다.    


9. 컴포넌트의 LifeCycle

mount - update - unmout

이 과정의 중간에 코드를 실행해줄 수 있다. 갈고리(hook)을 달아서 
마운트 시 코드 실행, 업데이트 시 코드 실행, 언마운트 시 실행할 수 있다.
이러한 갈고리를 Lifecycle Hook이라고 부른다.

클래스형 컴포넌트 생성 시 아래와 같이 적어줬었다.

class Detail2 extends React.Component {
  componentDidMount(){
    //Detail2 컴포넌트가 로드되고나서 실행할 코드
  }
  componentDidUpdate(){
    //Detail2 컴포넌트가 업데이트 되고나서 실행할 코드
  }
  componentWillUnmount(){
    //Detail2 컴포넌트가 삭제되기전에 실행할 코드
  }
}

함수형 컴포넌트에서는 아래와 같이 사용한다.

import {useEffect} from "react";
function DetailPage(props) {
  useEffect(()=> {
    //DetailPage컴포넌트가 mount, update(재렌더링) 시 실행된다.

  })
}

10. useEffect의 사용 이유

useEffect는 실행 시점이 다르다.
useEffect는 HTML렌더링이 전부 끝난 다음에야 실행된다.
만약 복잡한 연산 코드가 존재한다고 할 때, 그걸 useEffect 바깥에 적어주면,
HTML이 렌더링 되기 전에 그 작업을 수행하므로, UX가 좋지 않다.

그러나 useEffect 내부에 그 코드를 적어 주면 HTML이 전부 렌더링 된 다음에야
실행되므로 UX가 전자에 비해 향상된다. 따라서 아래의 작업에 자주 사용된다.

- 어려운 연산
- 서버에서 데이터를 가져오는 작업
- 타이머 장착

Effect가 붙은 이유.
useEffect가 SideEffect를 담당하기 때문이다. SideEffect는 부가적인 코드가 아닌 코드들이다.

부가(타이며 활용법)
setTimeout(() => {실행할 코드}, 1000)

예시)

  useEffect(() => {
    // 마운트 또는 업데이트 시 타이머 시작
    setTimeout(() => {
      setAlert((currentState) => (currentState = false));

      // setAlert((currentState) => !currentState); 이 코드는 작동X
    }, 2000);
  }, []); 

  여기서 두 번째 파라미터는 의존성(dependency) 배열이다.
  - 만약 의존성 배열을 파라미터로 넣어주지 않는다면, 해당 컴포넌트가 mount, update될 때마다 실행된다.
  - 빈 배열만 파라미터로 넣어준다면 mount될 때만 실행된다. update시에는 실행되지 않는다.(1회만 실행 원할 떄)
  - 그런데 만약 []을 넣어주고 그 안에 변수(의존성)을 추가해주면, 해당 변수가 변할 때만 실행해준다.

    useEffect(() => {
    // 마운트 또는 업데이트 시 타이머 시작
    setTimeout(() => {
      setAlert((currentState) => (currentState = false));

      console.log("1");
    }, 2000);
  }, [count]); //count 추가. 버튼을 눌러 count가 변할 때마다 실행된다.

  


  1. 이러면 재렌더링마다 코드를 실행가능합니다.
useEffect(()=>{ 실행할코드 })


  2. 이러면 컴포넌트 mount시 (로드시) 1회만 실행가능합니다.
useEffect(()=>{ 실행할코드 }, [])

3. 이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다. 
useEffect(()=>{ 
  return ()=>{
    실행할코드
  }
})

4. 이러면 컴포넌트 unmount시 1회 실행됩니다.
useEffect(()=>{ 
  return ()=>{
    실행할코드
  }
}, [])

5. 이러면 state1이 변경될 때만 실행됩니다. 
useEffect(()=>{ 
  실행할코드
}, [state1])

--------------------------------------------

11. 리액트에서의 서버 통신과 ajax

ajax를 사용하면 새로고침 없이도 GET/POST 사용 가능

ajax 사용 옵션은 3개 택1
1. XMLHttpRequest(예전)
2. fetch() (요즘)
3. axios (외부 라이브러리) :코드가 짧아짐

이번에는 axios 사용
설치:
npm install axios

사용:
import axios from 'axios'
let [axiosData, setAxiosData] = useState([]);
...
<button onClick={() => {

  //GET 요청 시
    axios
      .get("https://codingapple1.github.io/shop/data2.json")
      .then((result) => {
        console.log(result.data);
        setAxiosData((currentData) => {
          currentData = [...result.data];
          return currentData;
        });
      })
      .catch(() => {
        console.log("axios 실패함");
      });

    //POST 요청 시
    axios.post('URL', {name : 'kim'})
    
    //동시에 AJAX 요청 여러개 날리기
    Promise.all( [axios.get('URL1'), axios.get('URL2')] )
    .then(둘 다 성공시 실행할 코드)

  }}
>
  버튼
</button>
#원래 서버와의 통신은 문자열만 가능하다. 그런데 서버에서
배열이나 오브젝트를 받을 수 있는 것은 "["이름":"name"]"처럼 문자열화 해주기 때문이다.
이렇게 문자열화 된 오브젝트를 JSON이라고 한다.

#axios는 json의 array/object화를 자동으로 해준다. fetch는 직접해줘야 한다.
--------------------------------------------
fetch("https://codingapple1.github.io/shop/data2.json")
.then(결과 => 결과.json()) //json의 array/object화 필요
.then(data => {})

--------------------------------------------
12. 탭 만들기

react-bootstrap 사용

1. 먼저 탭을 만든다. 그리고 그 아래 보여질 내용을 HTML에 만들었다.
2. 보여져야 할 UI를 state로 만든다. let [tab. setTab] = useState(0)
3. state값에 따라 내용이 바뀔 수 있도록 내용을 반환하는 컴포넌트 생성
4. 버튼을 누를 때 스테이트 값이 바뀌고, 그 스테이트 값이 컴포넌트에 전달되도록 props작성.