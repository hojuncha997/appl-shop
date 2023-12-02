// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import { lazy, Suspense, useState, useEffect, createContext } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import "./App.css";
import data from "./data.js";
import Card from "./Card.js";
import AboutPage from "./pages/AboutPage.js";
import EventPage from "./pages/EventPage.js";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

// lazy로딩으로 변경
// import DetailPage from "./pages/DetailPage.js";
// import CartPage from "./pages/CartPage.js";
const DetailPage = lazy(() => import("./pages/DetailPage.js"));
const CartPage = lazy(() => import("./pages/CartPage.js"));

// Context로 감싼 컴포넌트에서 가져다 써야 하기 때문에 export 해야 한다
export let Context1 = createContext();

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

  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  useEffect(() => {
    if (count != 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);

  // 서버에서 가져온 데이터로 가정
  let [shoes, setShoes] = useState(data);

  let [getCount, setGetCount] = useState(1);

  let [isLoading, setIsLoading] = useState(false);

  // Context API 실습을 위한 스테이트. 이를 DetailPage나 TabContent 컴포넌트에서 사용한다.
  let [stock, setStock] = useState([10, 11, 12]);

  let localStrg = useSelector((state) => state.localStrg);

  let navigate = useNavigate(); //페이지 이동 용이.

  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
      alert("localstorage에 watched 생성함");
    }
    // else {
    //   alert("localstorage에 watched이미 존재함");
    // }
  }, []);

  return (
    <div className="App">
      <div>
        <div>안녕하십니까 전 {age}</div>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          누르면한살먹기
        </button>
      </div>

      {/* <Button variant="primary">Primary</Button> */}
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
              // 1은 앞으로 1페이지
              // -2은 뒤로 2페이지
            >
              뒤로 가기
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading ? "로딩 중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>
      {/* <Link to="/" className="link">
        홈
      </Link>
      <Link to="/detail" className="link">
        상세페이지
      </Link> */}
      <Suspense fallback={<div>로딩 중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* 이미지 삽입 */}
                <div className="main-bg"></div>
                {/* 부트스트랩 그리드 사용*/}
                <div className="container">
                  <div className="recent-view">
                    recent view
                    {localStrg.map((element, index) => {
                      return <p>{element}</p>;
                    })}
                  </div>
                  <div className="row">
                    {/* <div className={"start " + pageFade}> */}
                    {/* <div className="start end"> */}
                    {/* <div className="row"> */}
                    {shoes.map((item, index) => {
                      return (
                        // <Card imgUrl={urlList[index]} product={shoes[index]} />
                        <Card products={shoes} index={index} />
                      );
                      // return <Card index={index} product={shoes[index]} 도 고려 가능. src는 컴포넌트에 고정/>;
                    })}
                    {/* </div> */}
                  </div>
                  {getCount != 3 ? (
                    <button
                      onClick={() => {
                        axios
                          .get(
                            "https://codingapple1.github.io/shop/data" +
                              (getCount + 1) +
                              ".json"

                            // "https://codingapple1.github.io/shop/data3.json"
                          )
                          .then((result) => {
                            console.log(result.data);

                            setIsLoading(true);
                            setShoes((currentData) => {
                              currentData = [...currentData, ...result.data];
                              return currentData;
                            });
                            setGetCount(getCount + 1);
                            setIsLoading(false);
                          })
                          .catch(() => {
                            console.log("axios 실패함");
                            setIsLoading(false);
                          });
                      }}
                    >
                      버튼
                    </button>
                  ) : null}
                  {isLoading == true ? <h1>로딩 중입니다</h1> : null}
                </div>
              </>
            }
          />
          {/* <Route path="/detail" element={<div>상세페이지</div>} /> */}
          {/* <Route path="/detail" element={<DetailPage shoes={shoes} />} /> */}
          {/* url파라미터 사용: 아무거나 넣을 수 있음. */}

          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ stock, shoes }}>
                <DetailPage shoes={shoes} />
                {/* 여기 안의 모든 컴포넌트는 stock, shoes 사용가능 */}
              </Context1.Provider>
            }
          />

          <Route path="/about" element={<AboutPage />}>
            <Route path="member" element={<div>멤버</div>} />
            <Route path="location" element={<div>로케</div>} />
          </Route>

          <Route path="/event" element={<EventPage />}>
            <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
          </Route>

          <Route
            path="/cart"
            element={
              // <Suspense fallback={<div>로딩 중임</div>}> Routes 전체 다 감싸기로함.
              <CartPage />
            }
          />

          {/* "*" 적힌 경로 외의 모든 경로에 대해서 */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
