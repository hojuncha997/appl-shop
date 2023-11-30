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
--------------------------------------------

탭 애니메이션 만들기
전환 애니메이션은 부착하면 애니메이션 나오는 className을 하나 만들고
원할 때 부착하면 된다.

1. 애니메이션 동작 전 className만들기
2. 동작 후 className 만들기
3. classname에 transition 속성 추가
4. 원할 때 2 번 className 부착

//App.css
.start {
  opacity: 0;
}
.end {
  opacity: 1;
  transition: opacity 0.5s;
}


--------------------------------------------
14. Context API 사용하기(props 대신)

SPA의 단점은 컴포넌트 간 state 공유가 어렵다는 것이다.
물론 부모 컴포넌트가 자식에게 props로 전달해 줄 수 있다.

그런데 조부모 컴포넌트에서 손자 컴포넌트에게 직접 스테이트를 전달할 수는 없다.
자식이 다시 한 번 더 손자에게 props를 전달해야 한다.

만약 컴포넌트가 10번 중첩돼 있으면 계속해서 props를 전달해야 한다.
이는 너무 복잡하다. 아래의 방법들을 사용해 볼 수 있다.

1. Context API 사용(리액트 기본 문법) 
2. Redux 등 외부 라이브러리 사용

위 방법을 사용하면 아래의 컴포넌트가 상위 컴포넌트들의 데이터들을 자유롭게 사용할 수 있다.
그런데 Context API는 현장에서는 잘 사용하지 않는다. 
성능 이슈와 컴포넌트 재활용이 어렵다는 점 때문이다.

14-1. Context API 세팅

1. createContext()
2. <Context.Provider>로 스테이트 공유를 원하는 컴포넌트 감싸기
3. <Context.Provider>에 value={{}} 속성을 추가해 공유를 원하는 스테이트 추가
    --> <Context.Provider value={{state1, state2 ...}}>


//App.js

// Context로 감싼 컴포넌트에서 가져다 써야 하기 때문에 export 해야 한다
export import { createContext } from "react";

//함수 바깥에 설정. state 보관함
let Context1 = createContext();


//자식 컴포넌트가 가져다 쓸 데이터
let [stock, setStock] = useState([10, 11, 12]);

return(
  ...
  <Route
    path="/detail/:id"
    element={
      <Context1.Provider value={{stock, shoes}}>
        <DetailPage shoes={shoes} />
        {/* 여기 안의 모든 컴포넌트는 stock, shoes 사용가능 */}
      </Context1.Provider>
    }
  />
)

4. Context 임포트
5. useState 임포트 후 Context 감싸기

//DetailPage.js

import { Context1 } from "../App";
//Context 값을 사용하기 위해 useContext 임포트
import { useContext} from "react";

const DetailPage = (props) => {
  
  // 보관함을 해제한다. {state1, state2..} 처럼 Object 형식으로
  // 이렇게 가져다 쓸 수 있다.
  let { stock, shoes } = useContext(Context1);

// 그 자식 컴포넌트에서도 사용할 수 있다.
const TabContent = ({ tab }) => {
  let { stock } = useContext(Context1);


---------------------------
Context API를 잘 안쓰는 이유

1. state 변경 시 쓸 데 없는 것까지 재 렌더링한다.
  <Context>의 값이 바뀌면 그걸로 감싼 아래 컴포넌트들까지 재렌더링한다. 성능이슈

2. 컴포넌트 재사용이 어려움.
자식 컴포넌트가 Context의 값을 사용하고 있는 경우, 해당 컴포넌트를 다른 컴포넌트에
가져와서 사용하기 애매해진다.

실제로는 Redux와 같은 외부 라이브러리를 더 자주 사용한다.

---------------------------

15. Redux 사용 (장바구니 페이지 만들기)

장바구니 데이터를 state에 보관해 주고 데이터 바인딩 한다.
그런데 만약 그 데이터가 App, DetailPage, CartPage 모두 필요하다면,
App에서 만들어야 한다.

그런데 그렇게 하면 Props를 계속 넘겨줘야 하고 이는 번거롭다.

Redux라는 라이브러리를 사용하면 컴포넌트들이 props 없이도
state를 공유할 수 있다.

1.redux를 사용하면 js 파일을 하나 만들고 거기에 스테이트들을
보관해 둘 수 있다.

2. 모든 컴포넌트들이 거기에 있는 state들을 가져와서 사용할 수 있다.

따라서 규모가 큰 앱에서는 대부분 redux를 사용한다.

*react와 react-dom 버전이 18.1 이상이어야 한다.

15-1. Redux 설치
npm install @reduxjs/toolkit react-redux


15-2. Redux 세팅
  (1). src/store.js 파일 생성
  (2). 해당 파일에 아래 코드 붙여넣기

    import { configureStore } from '@reduxjs/toolkit'

    export default configureStore({
      reducer: { }
    }) 

  (3). index.js에서 <Provider store={store}> 쓰기
  
  //index.js
  import { Provider } from "react-redux";
  import store from "./store";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}> //store는 redux store로 사용할 /src/store.js이다.
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
  reportWebVitals();

이로써 <App> 컴포넌트와 그 자식들은 store에서 값을 맘대로 꺼내 쓸 수 있다.


------------------------

Redux 사용

Redux store에 state 보관하는 법

1. 우선은 slice(state)를 만들어준다.

import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState와 유사한 역할
// state 하나를 slice라고 부른다
createSlice({
    name: 'state 이름~',
    initialState: '실제 state의 값~'
})

export default configureStore({
  reducer: {},
});

2. state 등록

export default configureStore({
  reducer: {
    // 작명: sliceName.reduce (reducer를 꼭 붙여줘야 함)
    user: user.reducer,
  },
});


즉, slice를 생성하고 규격에 맞춰서 등록해준다.

import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState와 유사한 역할
// state 하나를 slice라고 부른다
let user = createSlice({
  name: "user",
  initialState: "cha",
});

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    // 작명: sliceName.reduce (reducer를 꼭 붙여줘야 함)
    user: user.reducer,
    stock: stock.reducer,

  },
});

3. 가져다 쓰기( CartPage.js에서 사용)


import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartPage = () => {
  
  // (state) => {return state} 일반적으로 이렇게 적어놓고 시작한다.
  // 위는 Redux 만든 사람이 정한 규칙이다.
  // a는 state의 모든 state가 저장된다.
  // 만약 let a = useSelector((state) => {return state.user}) 했다면
  // a에는 user에 해당하는 값만 저장된다. //cha
  
  let a = useSelector((state) => {
    return state;
  });
  console.log(a); //{user: 'cha', stock: Array(3)}
  console.log(a.user); // cha
  console.log(a.stock[0]); // 10
...


5. Redux가 편한데 props를 사용하는 이유
- redux 설정이 복잡하고 길어짐. 따라서 간단한 pjt는 props사용도 괜찮다.
- 컴포넌트가 많아지면 redux 쓸 수밖에 없다.
- 그러나 그렇다고 모든 state를 Redux store에 등록할 필요는 없다.
- 만약 공유가 필요없는 state라면 useState사용이 더 나을 수 있다.



#################################

Redux의 state 변경하는 법

#################################

redux의 state를 변경하는 방법은 기존 useState의 방법과는 다르다.
만약 'cha'라는 state를 philip cha로 변경하려면,

1. state를 수정하는 함수를 만든다.
2. 원할 때 그 함수를 실행해 달라고 store.js에 요청해야 한다.
3. 사용처에서 dispatch(state변경함수())를 사용하여 가져다 쓴다.

//store.js

let user = createSlice({
  name: "user",
  initialState: "cha",

  reducers: {
    // 1. 임의의 state 수정 함수를 생성한다
    changeName(state) {
      //기존 state를 변경하려면 파라미터를 넣어준다.
      return "Philip " + state;
    },
  },
});
// 2. 만든 함수를 export 한다. actions에는 state변경함수들이 남는다.
export let {changeName} = user.actions
//이제 만든 함수를 import 해서 사용하면 된다

----


3. 가져다 쓰기

store에서 만든 함수를 import 한다.
해당 함수를 호출하기 위해 useDispatch도 import 한다.

//CartPage.js

import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store";

  //store.js에 요청을 보내는 함수이다.
  //dispatch(state변경함수()) 이렇게 사용해야 한다.
  //dispatch(stateName())

  let dispatch = useDispatch();

return(
  ...
  <button onClick={() => {
    //여기서 실행하는 것이 아니다. store.js로 메시지만 보낸다
      dispatch(changeName());
  }}>
    +
  </button>
)

----
state 수정 함수를 스토어에 만들어 놓는다.
개별 컴포넌트에서 수정 함수를 실행해 달라고 스토어에 요청한다.
이 때 useDispatch를 사용한다.

이런 방식의 이점:

만약 store의 state를 모든 컴포넌트에서 직접 변경할 수 있었다면,
문제가 생겼을 시 모든 컴포넌트를 다 뒤져야 한다.
그런데 state 수정함수를 미리 만들어 놓고,
 개별 컴포넌트가 요청하는 방식을 사용하면,
 문제가 생겼을 때 store의 로직만 확인하면 된다.



#################################

Redux의 state가 Object/array일 경우의 변경

#################################

//store.js
let user = createSlice({
  name: "user",
  initialState: { name: "cha", age: 20 },

  reducers: {
    changeName(state) {
      //   return { name: "park", age: 20 };
      // 아래와 같이 array/object의 경우 직접 수정해도 state 변경된다. 자동설치된 immer.js 덕분이다.
      state.name = "park";
    },
    increase(state) {
      state.age += 1;
    },
  },
});
export let { changeName, increase } = user.actions;

결론: state가 object/arry면 return 없이 직접 수정해도 된다.
그래서 문자 하나만 필요해도 일부러 {}에 담아서 쓰기도 한다.



## 그런데 만약 파라미터를 전달해서 수정하고 싶다면?


increase(state, action) {
      state.age += action.payload;
    },

이런 식으로 state 옆에 파라미터를 추가해줘서 사용할 수 있다.
물론 사용처에서도 increase(10) 처럼 파라미터를 사용해서 
store.js의 함수를 호출할 수 있다.

*받은 파라미터를 함수 본문에서 사용할 때는 .payload를 반드시 붙여준다.
왜냐하면 파라미터 자체는 Object로 전달되기 때문이다

* 파라미터는 일반적으로 actions으로 이름을 지어준다. payload 뿐만 아니라
action과 관련된 정보를 담아 보내기도 하기 때문이다.

*action은 Redux의 state변경 함수들을 의미한다.



#################################

파일 분할

#################################
store.js가 너무 길어지면 가독성이 떨어진다.
let user와 같은 변수들을 각각의 파일에 담아서 store.js에서
import 하여 사용하는 방법도 있다.

여기서는  /src/store라는 디렉토리에 만들어준다.
user의 경우는 userSlice.js로 만들었다.

// userSlice.js: export default user (변수 내보내기)
import { configureStore, createSlice } from "@reduxjs/toolkit";
let user = createSlice({
  name: "user",
  initialState: { name: "cha", age: 20 },

  reducers: {
    changeName(state) {
      state.name = "park";
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});
export let { changeName, increase } = user.actions;
//여기가 추가 됐음
export default user


//store.js: 분할된 파일만 불러옴
import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

//CartPage.js: 임포트 경로 수정
import { changeName, increase } from "../store/userSlice";

----
사실상 지금까지 쓴 것은 Redux가 아니라 Redux toolkit이다.
Redux가 너무 복잡해서 간편하게 만든 것이다.




#################################

16. localStorage 사용( 최근 본 상품 기능 )

#################################

개발자 도구  -> application 탭 -> localStorage
로컬스토리지는 key:value 형태로 저장 가능하다.
- 문자 데이터만 저장 가능하며 사이트별 최대 5MB까지만 저장 가능하다.
- 유저가 브라우저를 청소하지 않는 이상 반영구적으로 남아 있다.
- 따라서 재접속 시에도 사용이 가능하다.

세션 스토리지
- 브라우져를 끄면 저장했던 데이터가 날아간다.

로컬 스토리지에 저장하는 법
localStorage.setItem('key','value') 형식
e.g. localStorage.setItem('age','20') //숫자를 넣어도 문자화 되어 저장된다.

로컬 스토리지에서 데이터 가져오는 법
localStorage.getItem('key')

e.g. localStorage.getItem('age')
'20'

로컬 스토리지에서 데이터 삭제
localStorage.removeItem('key')

e.g. localStorage.removeItem('age')
undefined

localStorage.getItem('age')
null

로컬스토리지의 데이터를 직접 수정하는 방법은 없다.
데이터를 꺼내서 수정하고 다시 집어 넣으면 된다.
(세션 스토리지에 저장하려면 localStorage를 sessionStorag로 바꾸기만 하면 된다.)

localStorage에는 arra/object를 저장할 수 없다.
그러나 JSON으로 바꿔주면 문자 취급을 하기 때문에 가능하다.

let obj = {name: 'kim'}
localStorage.setItem('data', obj)
//위처럼 넣으면 [object Object]로 ,깨져서 저장된다.

따라서 아래처럼 저장해야 한다.
localStorage.setItem('data', obj.JSON.stringfy(obj))
data : {"name":"kim"}

!

그런데 이걸 다시 
let restore = localStorage.getItem('data')로 꺼내면
{"name":"kim"} 이렇게 되어 있다. 이것은 JSON이고 객체가 아니기 때문에
Object 문법을 적용하려면 JSON을 다시 Obeject화 해줘야 한다.
이 때 사용하는 함수가 JSON.parse()이다.

console.log(JSON.parse(restorea)) // {name: 'kim'}
let obj = JSON.parse(restorea)
console.log(obj.name) // kim 오브젝트 문법 적용 가능

상세페이지 들어갔을 때의 상품 번호를 localStorage에 담았다가
메인페이지로 돌아갔을 때 꺼내서 보여준다.
watch라는 key와 []라는 value를 사용한다.
주의점1: 중복 상품은 담지 않는다.
주의점2: 먼저 저장할 공간이 있어야 한다. 
//App.j

import { useSelector } from "react-redux";
  let localStrg = useSelector((state) => state.localStrg);
...
useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
      alert("localstorage에 watched 생성함");
    } 
  }, []);

...
  <div className="recent-view">
                  recent view
                  {localStrg.map((element, index) => {
                    return <p>{element}</p>;
                  })}
                </div>



//DetailPage

useEffect(() => {
    if (item != -1 || item != null || item != undefined) {
      // let watched = JSON.parse(localStorage.getItem("watched"));
      // watched.push(item.id);
      // watched = [...new Set(watched)];
      // localStorage.setItem("watched", JSON.stringify(watched));
      // alert(watched);

      // watched = new Set(watched) :set으로 중복 없애기
      // watched = Array.from(watched) :다시 Array로 변환

      // 이러면 근데 watched 배열의 순서가 바뀌지 않아 아래와 같이 그냥함

      let watched = JSON.parse(localStorage.getItem("watched"));
      let target = watched.indexOf(item.id);
      if (target != null || target != undefined) {
        watched.splice(target, 1);
      }
      watched.push(item.id);
      localStorage.setItem("watched", JSON.stringify(watched));
    }
  }, []);


//localStorageSlice.js

import { createSlice } from "@reduxjs/toolkit";

let localStrg = createSlice({
  name: "localStrg",
  initialState: JSON.parse(localStorage.getItem("watched")),
  reducers: {
    getWatchedList(state, action) {
      //   console.log("state.cart.initialState", state.cart.initialState); 틀린 표현
    },
  },
});
export let { getWatchedList } = localStrg.actions;
export default localStrg;



//store.js

import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/cartSlice";
import localStrg from "./store/localStorageSlice";

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
    localStrg: localStrg.reducer,
  },
});


#################################
이렇게 localStorage를 사용하는 게 편리하다 보니
모든 state를 자동으로 localStorage에 저장하는 라이브러리도 생겨났음.

예를 들어 redux를 사용하는 경우, redux-persist 와 같은 라이브러리를 사용하면
거의 모든 state들을 localStorage에 저장할 수 있다.

참고로 redux와 같은 라이브러리를 state 관리 라이브러리라고 한다.
Jotai, Zustand 등이 있으며 redux보다 더 쉽다.





#################################

17. 리액트 쿼리 (react-query)

#################################

서버와 통신 시 응용 기능들이 필요할 수 있다.
예를 들어,

- ajax 성공 시/ 실패 시 HTML 보여주려면?
- 몇 초마다 자동으로 ajax 요청
- 실패 시 몇 초 후 요청 재시도?
- 다음 페이지 내용을 미리 가져올까(prefetch)

이런 것들은 라이브러리를 사용하지 않고도 구현할 수 있지만, 
react query 와 같은 라이브러리를 사용하면 좀 더 쉽게 구현할 수 있다.

이러한 react query는 SNS나 코인 거래처럼 실시간 데이터가 중요한 경우에 자주 쓰인다.
모든 사이트에서 자주 사용되는 것은 아니다.

1. 설치
npm install react-query

2. 세팅
//index.js

import { QueryClient } from "react-query";
const queryClient = new QueryClient(); //

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}> //
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
reportWebVitals();

3. 사용 세팅은 끝. 이제 개별 컴포넌트에서 사용해야 한다.


//App.js
import { useQuery } from "react-query";

function App() {
 let result = useQuery(
    "작명",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    // 2초 내에는 refetch 되지 않음
    { staleTime: 2000 }
  );

  /*
  result.data; //성공 시 가져오는 데이터가 들어 있음.
  result.isLoading; //로딩 중이면 true
  result.error; //에러 발생했으면 true

  장점1. 성공/실패/로딩중 쉽게 파악 가능
  장점2. 자동으로 refetch 해준다.( refetch 주기 설정, on/off 설정 가능 )
  장점3. 실패 시 자동으로 retry 해준다.
  장점4. state 공유 안해도 된다.
      state로 공유하지 않고 useQuery로 ajax 요청을 몇 군데서 해도 된다. 
      예를 들면 동일한 경로로 똑같은 쿼리를 날리는 코드가 두 개가 있다고 하자.
      그러나 react-query는 같은 곳으로 두 번 쿼리를 날리지 않는다. 합쳐서 한 번만 한다.
      따라서 비효율이 발생하지 않는다.
  장점5. ajax 결과 캐싱이 가능하다.
      두 군데서 useQuery()를 통해 값을 요청했을 경우, 먼저 값을 가져온 코드에서 ajax 요청결과를 캐싱했다가
      아직 가져오지 않은 곳에다 보여준다.
*/
*/
...
  return(
    <Nav className="ms-auto">
            {result.isLoading ? "로딩 중" : result.data.name}
          </Nav>
  )



#################################

18. 성능개선1: 개발자 도구 & lazy import(lazy(), <Suspense>)

#################################

18-1.
일반 개발자 도구 element로는 컴포넌트 구조를 확인하기 어렵다.
이를 원하는 경우엔느 크롬 웹 스토어에서 React Developer Tools를 설치한다.

이제 개발자 도구에서 component탭을 클릭한다.
컴포넌트 구조가 보일 뿐만 아니라, 돋보기로 페이지의 특정 부분을 클릭하거나 호버 하면
컴포넌트의 위치와 props들까지 보여준다.
props란에서 값으 변경할 수도 있고
hooks 란에서 스테이트들도 확인할 수 있다.

컴포넌트를 클릭하고 우측 상단의 <>을 누르며 소스 탭으로 이동하여 위치를 바로 보여준다.


profiler 탭도 생성되는데, 이는 성능이 저하되는 느린 컴포넌트를 찾는데 사용된다.
O 버튼을 눌러 녹화를 시작하고 앱을 사용한 뒤, 다시 O 버튼을 눌러 녹화를 멈춘다.
이러면 사이트 조작 시 렌더링 됐던 컴포넌트들이 시간을 바 형태로 기록해준다.
이를 클릭 등으로 확인하여 성능 저하를 일으키는 컴포넌트를 찾을 수 있다.

일반적으로 이 탭을 활용할 일은 많지 않다.
대부분의 경우 페이지의 지연을 발생시키는 것은 ajax 요청이다.

--

크롬 확장에서 Redux DevTools를 설치하여 사용할 수도 있다.
이를 사용하면 리덕스 관련 탭을 사용할 수 있다.
- store를 한 눈에 보여주고,
- state 변경한 내역을 알려준다,.



18-2. 성능 개선
SPA의 특징은 발행하면 js 파일 하나에 모든 코드를 합쳐 놓는다.
따라서 사이즈가 매우 크다.

유저가 메인 페이지에 접속하면
1. html 파일
2. css 파일
3. 큰 js파일

을 다운 받는다. 따라서 로딩 속도가 느리다.

따라서 이 JS 파일을 분해해 놓으면 성능을 개선할 수 있다.

메인페이지인 App.js를 로드할 때, DetailPage.js와 CartPage.js 컴포넌트는
로드할 필요 없다. 

따라서 이런 컴포넌트들을 lazy 하게 로드하라고 할 수 있다.

import DetailPage from "./pages/DetailPage.js";
import CartPage from "./pages/CartPage.js";

이런 코드를
import {lazy} from "react"

const DetailPage = lazy(() => import("./pages/DetailPage.js"))
const CartPage = lazy(() => import("./pages/CartPage.js"))

이렇게 해놓으면, 해당 컴포넌트가 필요해질 때 import하라는 뜻이다.
이렇게 해 놓으면 사이트 발행 시에도 별도의 js파일로 분리된다.

* 단, 이는 변수화 되었으므로 파일 내에서 반드시 import 문의 아래에 위치해야 한다!


그러나 이렇게 해 놓으면 유저가 CartPage, DetailPage로 이동할 때,
컴포넌트 로딩 시간이 발생한다. 이 때문에 사용자가 흰 화면을 보게 되거나,
컴포넌트가 제 때 로딩되지 않아 오류가 발생할 수도 있다.

이를 위해 <Suspense>를 사용하여 그 간격을 메꾼다.

아래와 같이 사용할 수 있다.
//App.js
import {Suspense} from "react"
...
return (
  ...
<Route
  path="/cart"
  element={
    <Suspense fallback={<div>로딩 중임</div>}>
      <CartPage />
    </Suspense>
  }
/>


그런데 이렇게 보통은 <Routes> 전체를 감싸는 게 일반적이다.
    <Suspense fallback={<div>로딩 중임</div>}>
      <Routes>
      ...
      </Routes>
    </Suspense>