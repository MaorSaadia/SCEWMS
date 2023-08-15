import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactPageScreen = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_536wykn', 'template_l71okam', form.current, 'lBsAmmipMXui-CCNLQLfL')
      .then((result) => {
        console.log(result.text);
        console.log("message sent")
      }, (error) => {
        console.log(error.text);
      });
  };
  

  return (
    <div>
      <h1>Contact Us</h1>
      <div>
        <p>
          For any inquiries or support, please reach out to us via email:
        </p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:warehousesuppo@gmail.com">warehousesuppo@gmail.com</a>
          </li>
        </ul>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '4px' }}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            style={{ padding: '8px', width: '100%' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPageScreen;
