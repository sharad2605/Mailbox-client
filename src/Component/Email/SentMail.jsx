import React, { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import "./EmailItem.css";  // ✅ CSS Import

const SentMail = () => {
    const endpoint = localStorage.getItem('endpoint');
    const url = 'https://mailbox-client-auth-default-rtdb.firebaseio.com';

    const [emailArray, setEmailArray] = useState([]);

    useEffect(() => {
        if (!endpoint) {
            console.warn("⚠ Endpoint not found in localStorage");
            setEmailArray([]);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/sent/${endpoint}.json`, {
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
    }, [endpoint]);

    return (
        <div className="email-list-container">
            {endpoint ? (
                emailArray.length > 0 ? (
                    emailArray.map((email, index) => (
                        <EmailItem key={index} email={email} />
                    ))
                ) : (
                    <p>No Emails Found</p>
                )
            ) : (
                <p style={{ color: "red" }}>⚠ No endpoint found. Please log in again.</p>
            )}
        </div>
    );
}

export default SentMail;
