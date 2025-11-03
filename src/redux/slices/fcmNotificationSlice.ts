import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FcmNotificationState {
  token: string | null;
  messages: any[];
}

const initialState: FcmNotificationState = {
  token: null,
  messages: [],
};

const fcmNotificationSlice = createSlice({
  name: "fcmNotification",
  initialState,
  reducers: {
    setFcmToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setFcmToken, addMessage } = fcmNotificationSlice.actions;

export default fcmNotificationSlice.reducer;