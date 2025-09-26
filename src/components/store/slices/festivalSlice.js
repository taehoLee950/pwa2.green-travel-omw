import { createSlice } from "@reduxjs/toolkit";
import { getFestivalList } from "../thunks/festivalThunk";

const festivalSlice = createSlice({
  name: "festivalSlice",
  initialState: {
    list: [],
    currentIndex: 0,
    currentPage: 1,
  },
  reducers: {
    // 인덱스 번호를 증감하여 슬라이드 쇼의 사진 넘기기
    setCurrentIndexForNextImg(state, action) {
      const total = action.payload;
      if (total > 0) {
        state.currentIndex = (state.currentIndex + 1) % total;
      }
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFestivalList.fulfilled, (state, action) => {
        state.list = action.payload.items.item;
        state.currentPage = action.payload.pageNo;
        console.log("축제 API를 성공적으로 불러왔습니다.");
      })
      .addCase(getFestivalList.pending, () => {
        console.log("축제 API 불러오는 중...");
      })
      .addCase(getFestivalList.rejected, (state, action) => {
        console.error("축제 API 불러오기 실패: ", action.error);
      });
  },
});

export const { setFestivalList, setCurrentIndexForNextImg } =
  festivalSlice.actions;
export default festivalSlice.reducer;
