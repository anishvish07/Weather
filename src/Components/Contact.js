import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {BiRename ,BiLogoGmail} from 'react-icons/bi';
import './ContactUsCard.css'; // Import your custom CSS file
import {Link} from 'react-router-dom';
const ContactUsCard = () => {
  return (
    <div className="centered-container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>Have questions or suggestions? We'd love to hear from you!</p>
        <hr />

        <div className="social-links">
          
            <BiRename className="social-icon" />
         
        
            <BiLogoGmail className="social-icon" />
         
          
           
         
        </div>

        <div className="developer-info">
          <p>Developed by: Anish Vishwakarma</p>
          <p>Email: vishanish562@gmail.com</p>
          
        </div>

        <button className="contact-btn"><Link className='text-light' to="https://mail.google.com" >Get in Touch</Link></button>
      </div>
    </div>
  );
};

export default ContactUsCard;
