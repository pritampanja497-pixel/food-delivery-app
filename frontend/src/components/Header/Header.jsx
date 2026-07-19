import React, { useState, useEffect } from 'react'
import './Header.css'

const slides = [
  {
    title: "Order your favourite food here",
    subtitle: "Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.",
    btnText: "View Menu",
    bgClass: "slide-1"
  },
  {
    title: "Fresh & Fast Delivery",
    subtitle: "Get your favourite meals delivered hot and fresh to your doorstep in under 30 minutes. Quality you can taste, speed you can count on.",
    btnText: "Order Now",
    bgClass: "slide-2"
  },
  {
    title: "Exclusive Deals & Offers",
    subtitle: "Enjoy up to 50% off on your first order! Use code TOMATO50 at checkout and savour the savings on every delicious bite.",
    btnText: "Grab Deals",
    bgClass: "slide-3"
  }
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='header'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`header-slide ${slide.bgClass} ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="header-contents">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <button onClick={() => {
              const el = document.getElementById('explore-menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>{slide.btnText}</button>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      <button className="slider-arrow slider-arrow-left" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
        ‹
      </button>
      <button className="slider-arrow slider-arrow-right" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
        ›
      </button>
    </div>
  )
}

export default Header
