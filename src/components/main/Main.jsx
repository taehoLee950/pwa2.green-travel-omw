import { useDispatch, useSelector } from "react-redux";
import { getFestivalList } from "../store/thunks/festivalThunk";
import { useEffect } from "react";
import { setCurrentIndexForNextImg } from "../store/slices/festivalSlice";
import "./Main.css";
function Main() {
  // 축제 스토어 및 스테이트
  const festivalList = useSelector((state) => state.festival.list);
  const dispatch = useDispatch();

  // 슬라이드쇼 전용 idx 스테이트 불러오기
  const apiIndex = useSelector((state) => state.festival.currentIndex);

  // 축제 API 요청
  useEffect(() => {
    if (festivalList.length === 0) {
      dispatch(getFestivalList());
    }
  }, []);

  // idx로 슬라이드 이미지 변환 구현
  useEffect(() => {
    if (festivalList.length === 0) return;
    const timer = setInterval(() => {
      dispatch(setCurrentIndexForNextImg(festivalList.length));
    }, 2000);
    return () => clearInterval(timer);
  }, [dispatch, festivalList.length]);

  return (
    <>
      <div className="main-img-container">
        {festivalList.length > 0 && (
          <img
            src={festivalList[apiIndex].firstimage}
            alt="메인 이미지"
            className="main-img"
          />
        )}
      </div>
    </>
  );
}

export default Main;
