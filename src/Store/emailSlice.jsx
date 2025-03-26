import { createSlice } from '@reduxjs/toolkit';
import { EditorState, convertToRaw } from 'draft-js';

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        email: '',
        subject: '',
        body: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())), // ✅ Store as serializable JSON
    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setEmailSubject(state, action) {
            state.subject = action.payload;
        },
        setEmailBody(state, action) {
            state.body = JSON.stringify(convertToRaw(action.payload.getCurrentContent())); // ✅ Convert EditorState to JSON
        },
        resetEmailComposition(state) {
            state.email = '';
            state.subject = '';
            state.body = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
        }
    }
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
