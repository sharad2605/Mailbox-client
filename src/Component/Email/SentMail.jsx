import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import "./EmailItem.css";
import { useSelector,useDispatch } from "react-redux";
import { emailActions } from "../Store/emailSlice";


const SentMail = () => {
    const url = 'https://mailbox-client-auth-default-rtdb.firebaseio.com';
    const userEmail = useSelector((state) => state.auth.email);
    const sanitizedReceiver = userEmail?.replace(/[@.]/g, "");
    const emailArray = useSelector((state) => state.email.sentEmails);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/sent/${sanitizedReceiver}.json`);
                if (response.ok) {
                    const data = await response.json();
                    const emailsWithId = data
                        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
                        : [];
                    dispatch(emailActions.setSentEmails(emailsWithId)); // ✅ redux me set
                } else {
                    console.error('❌ Failed to retrieve data.');
                    dispatch(emailActions.setEmails([])); // ✅ clear redux
                }
            } catch (error) {
                console.error('❌ Error retrieving data:', error);
                dispatch(emailActions.setEmails([])); // ✅ clear redux
            }
        };
    
        fetchData();
    }, [dispatch, sanitizedReceiver]);
    
    

    const deleteEmailHandler = (emailId) => {
        console.log("Deleting Sent email with ID:", emailId);
        const emailPath = `sent/${sanitizedReceiver}/${emailId}.json`;
        fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/${emailPath}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            dispatch(emailActions.deleteEmail(emailId)); // Update Redux state
        }).catch((error) => {
            console.error("Error deleting sent email:", error);
        });
    };
    
    

    return (
        <div className="email-list-container">
            {emailArray.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '50px', color: 'gray' }}>
                    No Sent Mails Found
                </p>
            ) : (
                emailArray.map((email, i) => (
                    <EmailItem key={email.id} email={email} showUnreadDot={false} onDelete={deleteEmailHandler} />
                ))
            )}
        </div>
    );
}    

export default SentMail;
