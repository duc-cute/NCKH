/** @format */

import { createSlice } from "@reduxjs/toolkit";
// import * as actions from "./appAction";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    isShowModal: false,
    modalChildren: null,
    isLoading: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    // builder.addCase(actions.getCategories.pending, (state) => {
    //   // Bật trạng thái loading
    //   state.isLoading = true;
    // });
    // Khi thực hiện action login thành công (Promise fulfilled)
    // builder.addCase(actions.getCategories.fulfilled, (state, action) => {
    //   // Tắt trạng thái loading, lưu thông tin user vào store
    //   state.isLoading = false;
    //   state.categories = action.payload;
    // });
    // Khi thực hiện action login thất bại (Promise rejected)
    // builder.addCase(actions.getCategories.rejected, (state, action) => {
    //   // Tắt trạng thái loading, lưu thông báo lỗi vào store
    //   state.isLoading = false;
    //   state.errorMessage = action.payload;
    // });
  },
});
export const { showModal } = appSlice.actions;

export default appSlice.reducer;
