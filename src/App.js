// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import "./App.css";
import data from "./data.js";
import Card from "./Card.js";
import DetailPage from "./pages/DetailPage.js";
import AboutPage from "./pages/AboutPage.js";
import EventPage from "./pages/EventPage.js";

function App() {
  // 서버에서 가져온 데이터로 가정
  let [shoes, setShoes] = useState(data);

  let [getCount, setGetCount] = useState(1);

  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate(); //페이지 이동 용이.

  return (
    <div className="App">
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
                navigate(-1);
              }}
              // 1은 앞으로 1페이지
              // -2은 뒤로 2페이지
            >
              뒤로 가기
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Link to="/" className="link">
        홈
      </Link>
      <Link to="/detail" className="link">
        상세페이지
      </Link> */}

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
                      // <Card imgUrl={urlList[index]} product={shoes[index]} />
                      <Card products={shoes} index={index} />
                    );
                    // return <Card index={index} product={shoes[index]} 도 고려 가능. src는 컴포넌트에 고정/>;
                  })}
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
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />

        <Route path="/about" element={<AboutPage />}>
          <Route path="member" element={<div>멤버</div>} />
          <Route path="location" element={<div>로케</div>} />
        </Route>

        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>

        {/* "*" 적힌 경로 외의 모든 경로에 대해서 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
