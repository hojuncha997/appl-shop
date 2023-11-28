// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import { useState } from "react";

import "./App.css";
import data from "./data.js";
import Card from "./Card.js";

function App() {
  // 서버에서 가져온 데이터로 가정
  let [shoes, setShoes] = useState(data);
  let urlList = [
    "https://codingapple1.github.io/shop/shoes1.jpg",
    "https://codingapple1.github.io/shop/shoes2.jpg",
    "https://codingapple1.github.io/shop/shoes3.jpg",
  ];

  return (
    <div className="App">
      {/* <Button variant="primary">Primary</Button> */}
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* 이미지 삽입 */}
      <div className="main-bg"></div>

      {/* 부트스트랩 그리드 사용*/}
      <div className="container">
        <div className="row">
          {shoes.map((item, index) => {
            return <Card imgUrl={urlList[index]} product={shoes[index]} />;
            // return <Card index={index} product={shoes[index]} 도 고려 가능. src는 컴포넌트에 고정/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
