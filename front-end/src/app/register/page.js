// app/register/page.js
"use client";
import { useState, useEffect } from 'react';
import './register.css';
import { LoginButton } from '../login/page.js';
import { Footer, Navbarrend } from '../page.js';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    aboutMe: '',
    avatar: null,
    socialLinks: ''
  });

  const [progress, setProgress] = useState(0);
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    const requiredFields = ['email', 'password', 'firstName', 'lastName'];
    const filledFields = requiredFields.filter(field => formData[field].trim() !== '');
    const newProgress = (filledFields.length / requiredFields.length) * 100;
    setProgress(newProgress);
    setIsRequired(newProgress === 100);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files) {
      setFormData(prev => ({
        ...prev,
        avatar: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  

  
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const data = await response.json();
      alert('Registration successful! Please log in.');
      // Redirect to login page
      // window.location.href = '/login';
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div className='hero'>
      <Navbarrend NavButton={() => <LoginButton text="Login" path="/login" />} />
      <div className="register-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="background-glow"></div>
      
      <div className="register-card">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join our community</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section required">
          <p className='info-lable'>required info</p>
            <div className="input-grid">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  id="firstname"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <div className="input-glow"></div>
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="lastName"
                  id="lastname"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <div className="input-glow"></div>
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                id='password'
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <div className="input-glow"></div>
            </div>
            <div className="input-wrapper">
              <input
                type="date"
                name="socialLinks"
                placeholder="Social Media Links"
                value={formData.socialLinks}
                onChange={handleChange}
                required
              />
              <div className="input-glow"></div>
            </div>
          </div>
         

          <div className={`form-section optional ${isRequired ? 'revealed' : ''}`}>
          <p className='info-lable'>optional info</p>
            <div className="input-wrapper">
              <textarea
                name="aboutMe"
                placeholder="About Me"
                rows="3"
                value={formData.aboutMe}
                onChange={handleChange}
              ></textarea>
              <div className="input-glow"></div>
            </div>

          

            <div className="file-input-wrapper">
              <label>Profile Picture</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button onClick={handleSubmit} type="submit" id="register-button" className="submit-button">
            Join Now
            <div className="button-glow"></div>
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}


// function Register() {
//     const register_button = document.getElementById("register-button")
//     register_button.addEventListener("submit")

// }