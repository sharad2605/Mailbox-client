import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    email: localStorage.getItem("email") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action) {
            // 🔥 Corrected: Get email from action.payload
            const email = action.payload.email; 
            const sanitizedEmail = email.replace(/[@.]/g, ""); // Firebase ke liye sanitize karo
            
            localStorage.setItem("endpoint", sanitizedEmail);
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", email);

            state.token = action.payload.token;
            state.email = email;
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("endpoint");

            state.token = null;
            state.email = "";
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
