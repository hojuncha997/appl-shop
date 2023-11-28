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
