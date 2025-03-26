import { createSlice } from '@reduxjs/toolkit';
import { EditorState, convertToRaw } from 'draft-js';

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        emails: [],
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
        addEmail(state, action) {
            state.emails.push(action.payload); // Add a new email to the emails array
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
