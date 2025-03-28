import { createSlice } from '@reduxjs/toolkit';
import { EditorState, convertToRaw } from 'draft-js';

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        emails: [],
        inboxEmails: [],     // ✅ inbox ke liye
        sentEmails: [],
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
            const deletingMail = state.emails.find(mail => mail.id === emailId);
        
            if (deletingMail) {
                // Agar mail unread tha to count kam karo
                if (!deletingMail.read) {
                    state.unreadCount--;
                }
        
                // Mail ko hata do list se
                state.emails = state.emails.filter(mail => mail.id !== emailId);
            }
        },
        setInboxEmails(state, action) {
            state.inboxEmails = action.payload.filter(email => email && email.to && email.subject);
            state.unreadCount = state.inboxEmails.filter(email => !email.read).length;
        },
        setSentEmails(state, action) {
            state.sentEmails = action.payload.filter(email => email && email.to && email.subject);
            // Yaha unreadCount ko haath bhi mat lagana ❌
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
