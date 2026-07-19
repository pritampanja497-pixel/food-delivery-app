import React from 'react'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='contact-us' id='contact-us'>
      <div className="contact-us-content">
        <h1>Get In Touch</h1>
        <p>Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out through our contact details.</p>
        
        <div className="contact-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>

          <div className="contact-details-sidebar">
            <div className="contact-card-mini">
              <i className="fa-solid fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+91 8583814789</p>
              </div>
            </div>
            <div className="contact-card-mini">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>support@tomato.com</p>
              </div>
            </div>
            <div className="contact-card-mini">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <h3>Location</h3>
                <p>TN Mukherjee Road,Kolkata</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ContactUs
