import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js/frontend_assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StroreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { getTotalCartAmount, token, setToken, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (menuName, targetId) => {
    setMenu(menuName);
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const scrollToTop = () => {
    setMenu("home");
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive && location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div className='navbar'>
      <div onClick={scrollToTop} style={{ cursor: 'pointer' }}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </div>

      <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li onClick={scrollToTop} className={menu === "home" ? "active" : ""}>home</li>
        <a href='#explore-menu' onClick={() => handleNavClick("menu", "explore-menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => handleNavClick("mobile-app", "app-download")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#contact-us' onClick={() => handleNavClick("contact us", "contact-us")} className={menu === "contact us" ? "active" : ""}>contact us</a>

        
        {isMobileMenuOpen && (
          <div className="mobile-menu-close" onClick={toggleMobileMenu}>
            <img src={assets.cross_icon} alt="Close" />
          </div>
        )}
      </ul>

      <div className="navbar-right">
        <div className={`navbar-search ${isSearchActive ? 'active' : ''}`}>
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="navbar-search-input"
          />
          <div className="navbar-search-icon-wrapper" onClick={handleSearchClick}>
            <img src={assets.search_icon} alt="Search" />
          </div>
        </div>
        
        <div className="navbar-basket-icon">
          <Link to='/Card'><img src={assets.basket_icon} alt="Cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            {getTotalCartAmount() !== 0 && <span>!</span>}
          </div>
        </div>

        {!token ? (
          <button className="navbar-signin-btn" onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => { navigate('/myorders'); setIsMobileMenuOpen(false); }}>
                <img src={assets.bag_icon} alt="Orders" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar


