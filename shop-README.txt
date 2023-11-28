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