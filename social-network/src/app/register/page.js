// app/register/page.js
"use client";
import { useState } from 'react';
import './register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    avatar: null,
    nickname: '',
    aboutMe: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="register-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      <div className="register-card">
        <div className="register-header">
          <div className="avatar-circle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <h1>Create Account</h1>
          <p>Please fill in your information</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-section">
            <h2>Required Information</h2>

            <div className="name-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Optional Information</h2>

            <div className="input-wrapper">
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>

            <div className="input-wrapper">
              <textarea
                name="aboutMe"
                placeholder="About Me"
                rows="4"
                value={formData.aboutMe}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="file-input-wrapper">
              <label>Profile Picture (Optional)</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}