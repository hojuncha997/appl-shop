import { Outlet } from "react-router-dom";

const EventPage = () => {
  return (
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  );
};
export default EventPage;
