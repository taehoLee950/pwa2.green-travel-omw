import "./Festival.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getFestivalList } from "../store/thunks/festivalThunk";

function Festival() {
  const festivalList = useSelector((state) => state.festival.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.festival.currentPage);

  // 버튼 클릭 시 다음 페이지로 넘기기
  function moveToNextPage(nextPage) {
    dispatch(getFestivalList(nextPage));
    // 클릭 시 부드럽게 scroll 최상단으로 이동
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  // API 초기 요청
  useEffect(() => {
    if (festivalList.length === 0) {
      dispatch(getFestivalList(1));
    }
  }, []);

  // API의 문자열 축제 기간 포맷팅
  // 인자로 item의 eventstartdate & eventenddate을 받음
  function formatDate(dateString) {
    // api 내부 날짜 데이터가 없거나 포맷이 다른경우의 가드
    if (!dateString || dateString.length !== 8) {
      return "축제 기간 정보가 없습니다.";
    }
    const year = dateString.slice(0, 4); // yyyymmdd -> yyyy
    const month = dateString.slice(4, 6); // yyyymmdd -> mm
    const day = dateString.slice(6, 8); // yyyymmdd -> dd

    return `${year}.${month}.${day}`;
  }

  return (
    <>
      {festivalList.map((item) => (
        <div className="festival-card-container" key={item.contentid}>
          <img src={item.firstimage} alt={item.title} />
          <div className="card-info">
            <p>{item.title}</p>
            {/* 네이버 지도 연동 */}
            <a
              href={`https://map.naver.com/p/search/${item.addr1}`}
              target="_blank"
            >
              <p>{item.addr1}</p>
            </a>
            <p>{`${formatDate(item.eventstartdate)} - ${formatDate(item.eventenddate)}`}</p>
            <p dangerouslySetInnerHTML={{ __html: item.tel }}></p>
          </div>
          <button type="button">숙박 알아보기</button>
        </div>
      ))}

      <button
        type="button"
        className="pagination-arrow prev"
        onClick={() => moveToNextPage(currentPage - 1)}
      >
        &#8249;
      </button>
      <button
        type="button"
        className="pagination-arrow next"
        onClick={() => moveToNextPage(currentPage + 1)}
      >
        &#8250;
      </button>
    </>
  );
}

export default Festival;
