import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,  // Retrieve token from localStorage (if available)
  isLoggedIn: !!localStorage.getItem("token"),  // If token exists, set isLoggedIn to true
  email: localStorage.getItem("email") || '', 
  receiverEmail:'',  // Retrieve email from localStorage (if available)
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
   
  reducers: {
    login(state, action) {
      // 🔥 Set token and email from action.payload and store in localStorage
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.token);  // Save token to localStorage
      localStorage.setItem("email", action.payload.email);  // Save email to localStorage
    },
    logout(state) {
      // Remove token and email from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      state.token = null;
      state.email = "";
      state.isLoggedIn = false; // Logout also updates isLoggedIn
    },
    setReceiverEmail(state, action) {
      state.receiverEmail = action.payload; // 🔥 Store receiver email in Redux
    }
  },
  
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
