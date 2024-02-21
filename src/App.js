// import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const App = () => {

  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
          }
    }, auth);
  }

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.log(error);
      });
  }
  
  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
      }).catch((error) => {
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }

  if(!hasFilled){
    return (
      <div className='app__container' >
        <div >
          <div >
            <div >Enter your phone number</div>
            <form onSubmit={handleSend} >
              <input className='otpInput' label='Phone Number' value={phone} onChange={(event) => setPhone(event.target.value)} /> <br />
              <button type='submit'>Send Code</button>
            </form>
          </div>
        </div>
        <div id="recaptcha"></div>
      </div>
    ) 
  } else {
    return (
      <div className='app__container'>
        <div>
          <div>
            <div>Enter the OTP</div>
            <div>
              <input className='otpInput' label='OTP' value={otp} onChange={verifyOtp}   /> <br />
            </div>
          </div>
        </div>
        <div id="recaptcha"></div>
      </div>
    )
  }
}

export default App;