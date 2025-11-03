import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  show: false,
} 

const dashboardSidebarSlice = createSlice({
  name: "dashboard-sidebar",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    }
  }
})

export const { setShow } = dashboardSidebarSlice.actions;
export default dashboardSidebarSlice.reducer;

