import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import "./EmailItem.css";
import { useSelector } from "react-redux";

const SentMail = () => {
    const url = 'https://mailbox-client-auth-default-rtdb.firebaseio.com';
    const userEmail = useSelector((state) => state.auth.email);
    const sanitizedReceiver = userEmail?.replace(/[@.]/g, "");
    const [emailArray, setEmailArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/sent/${sanitizedReceiver}.json`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data retrieved successfully:', responseData);
                    setEmailArray(responseData ? Object.values(responseData) : []);
                } else {
                    console.error('❌ Failed to retrieve data.');
                    setEmailArray([]);
                }
            } catch (error) {
                console.error('❌ Error retrieving data:', error);
                setEmailArray([]);
            }
        };

        fetchData();
    }, [sanitizedReceiver]);

    return (
        <div className="email-list-container">
            {emailArray.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '50px', color: 'gray' }}>
                    No Sent Mails Found
                </p>
            ) : (
                emailArray.map((email, i) => (
                    <EmailItem key={i} email={email} showUnreadDot={false} />
                ))
            )}
        </div>
    );
};

export default SentMail;
