import { useDispatch, useSelector } from "react-redux";
import { getFestivalList } from "../store/thunks/festivalThunk";
import { useEffect } from "react";
import { setCurrentIndexForNextImg } from "../store/slices/festivalSlice";
import "./Main.css";
import { useNavigate } from "react-router-dom";
function Main() {
  // 축제용 스테이트, 리듀서, 상세 페이지 이동용 navigate 불러오기
  const festivalList = useSelector((state) => state.festival.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    }, 3000);
    return () => clearInterval(timer);
  }, [dispatch, festivalList.length]);

  // 축제 정보 출력 페이지로 이동할 navigate 함수 만들기
  function redirectToFestivalPage() {
    navigate("/festival");
  }
  return (
    <>
      <div className="main-img-container">
        <div
          className="slideshow-wrapper"
          // 인덱스 0번 사진 = 초기값
          // 인덱스 1번 사진 (이미 불러왔지만 아직 안보임)
          // 1 (idx) * 100% = 슬라이드 움직이며 다음 사진위치로 이동
          style={{ transform: `translateX(-${apiIndex * 100}%)` }}
        >
          {festivalList.map((item) => (
            <img
              onClick={redirectToFestivalPage}
              key={item.contentid}
              src={item.firstimage}
              alt="메인 이미지"
              className="main-img"
            />
          ))}
        </div>
        <p className="main-redirect-notification">축제 보러가기</p>
      </div>
      <p className="main-note-highlight">Green Travel</p>
      <p className="main-note">
        전국의 다양한 축제와 주변 지역 숙박 업소를 제공합니다
      </p>
    </>
  );
}

export default Main;
