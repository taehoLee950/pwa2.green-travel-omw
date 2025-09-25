import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../../../configs/axiosFestivalConfig";

export const getFestivalList = createAsyncThunk(
  "festivalList/getFestivalAPI",
  async (args, thunkAPI) => {
    // 현재 전역 state 상태 불러오기
    const state = thunkAPI.getState();

    // 축제 API 요청 url 경로
    const url = `${axiosConfig.BASE_URL}/searchFestival2`;

    // 축제 API 파라미터 저장
    const params = {
      // required keys
      MobileOS: axiosConfig.MOBILE_APP,
      MobileApp: axiosConfig.MOBILE_APP,
      eventStartDate: "20250101",
      serviceKey: axiosConfig.SERVICE_KEY,

      // optional
      _type: axiosConfig.TYPE,
      arrange: axiosConfig.ARRANGE,
      numOfRows: axiosConfig.NUM_OF_ROWS,
      pageNo: axiosConfig.PAGE_NO + 1,
      eventEndDate: "20251231",
    };
    // axios.get()의 { params } 는 고정으로 params 임.
    const response = await axios.get(url, { params });
    console.log("festivalThunk에서 API 리턴 확인: ", response);
    return response.data.response.body;
  }
);
