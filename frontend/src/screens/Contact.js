import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';

const Contact = () => {
    const { sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [subject, setSubject] = useState(''); // Separate state for subject textarea
    const [message, setMessage] = useState(''); // Separate state for message textarea
    const [capturedText, setCapturedText] = useState('');


    const now = new Date();
    const currentHour = now.getHours();
    let greeting;

    if (currentHour > 5 && currentHour <= 12) {
        greeting = 'בוקר טוב';
    } else if (currentHour > 12 && currentHour <= 16) {
        greeting = 'צהריים טובים';
    } else if (currentHour > 16 && currentHour <= 20) {
        greeting = 'ערב טוב';
    } else {
        greeting = 'לילה טוב';
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setMessage(message + '\n');
        }
    };

    const sendComment = async () => {
        console.log('check');
        setCapturedText(message); // Set the captured message
        setCapturedText(subject); // Set the captured subject
        setMessage(''); // Clear the message input

        try {
            // Send the comment request
            await sendRequest(
                'http://localhost:5000/api/users/sendComment',
                'POST',
                JSON.stringify({
                    subject: subject,
                    message: message,
                    name: auth.userName,
                    email: auth.email
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
        } catch (err) {
            throw err;
        }
        console.log('check2');
        alert('ההודעה הועברה למנהל המחסן');
    };

    return (
        <div>
            <>
                <hr className="hr-line-right"></hr>
                {auth.isLoggedIn ? (

                    <h1 className="ml">
                        {greeting} {auth.userName.split(' ')[0]}
                    </h1>
                ) : (
                    <h1 className="ml">ברוך הבא</h1>
                )}                <hr className="hr-line-left"></hr>
            </>
            <h3 style={{ textAlign: 'center' }}>
                שלום רב, הנך מוזמן להשאיר פניה ונעשה את מירב המאמצים ע"מ לחזור אליך בהקדם</h3>
            <div
                className="text-box-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <textarea
                    className="text-box"
                    placeholder="נושא"
                    style={{
                        width: '400px',
                        height: '60px',
                        fontSize: '24px',
                        padding: '10px',
                        border: '2px solid #ccc',
                        borderRadius: '4px',
                        textAlign: 'right',
                    }}
                    value={subject} // Use subject state instead of text state
                    onChange={(event) => setSubject(event.target.value)} // Use setSubject instead of setText
                />
                <h5></h5>
                <textarea
                    className="text-box"
                    placeholder="גוף ההודעה"
                    style={{
                        width: '400px',
                        height: '100px',
                        fontSize: '24px',
                        padding: '10px',
                        border: '2px solid #ccc',
                        borderRadius: '4px',
                        textAlign: 'right',
                    }}
                    value={message} // Use message state instead of text state
                    onChange={(event) => setMessage(event.target.value)} // Use setMessage instead of setText
                />
                <h1></h1>
                <h1></h1>
                <div style={{position:'relative'}}>
                    <div class="letter-image" onClick={() => sendComment()}
                    >
                        <div class="animated-mail">
                            <div class="back-fold"></div>
                            <div class="letter">
                                <div class="letter-border"></div>
                                <div class="letter-title"></div>
                                <div class="letter-context"></div>
                                <div class="letter-stamp">
                                    <div class="letter-stamp-inner"></div>
                                </div>
                            </div>
                            <div class="top-fold"></div>
                            <div class="body"></div>
                            <div class="left-fold"></div>
                        </div>
                        <div class="shadow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
