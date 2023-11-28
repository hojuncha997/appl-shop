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

