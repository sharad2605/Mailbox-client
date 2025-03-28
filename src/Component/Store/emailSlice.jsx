import { createSlice } from '@reduxjs/toolkit';
import { EditorState, convertToRaw } from 'draft-js';

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        emails: [],
        email: '',
        subject: '',
        unreadCount: 0,
        body: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())), // ✅ Store as serializable JSON
    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
            
        },
        deleteEmail(state, action) {
            const emailId = action.payload;
            state.emails = state.emails.filter((email) => email.id !== emailId);
          },
        setEmails(state, action) {
            state.emails = action.payload;
            state.unreadCount = action.payload.filter(email => !email.read).length;
            state.emails = action.payload.filter(email => email && email.to && email.subject);
        },
        setEmailSubject(state, action) {
            state.subject = action.payload;
        },
        setEmailBody(state, action) {
            state.body = JSON.stringify(convertToRaw(action.payload.getCurrentContent())); // ✅ Convert EditorState to JSON
        },
        // addEmail(state, action) {
        //     state.emails.push(action.payload); // Add a new email to the emails array
        // },
        // resetEmailComposition(state) {
        //     state.email = '';
        //     state.subject = '';
        //     state.body = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
        // },
        markAsRead(state, action) {
            const mailId = action.payload;
            const mail = state.emails.find(m => m.id === mailId ==action.payload);
            if (mail && !mail.read) {
              mail.read = true;
              state.unreadCount--;
            }
          },
    }
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
