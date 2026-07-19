import React from 'react'
import'./Footer.css'
import { assets } from '../../assets/assets.js/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p> Delicious food delivered to your doorstep with speed and care.
                Explore top restaurants and enjoy your favorite meals anytime.</p>
            <div className="footer-social-icon">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
              <li>+91 8583814789</li>
              <li>tomato77@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 Tomato.com-All right Reserved.</p>
    </div>
  )
}

export default Footer
