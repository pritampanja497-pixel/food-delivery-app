import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets.js/frontend_assets/assets'

const ExploreMenu = ({ category, setCategory }) => {

  const handleCategoryClick = (menuName) => {
    setCategory(prev => prev === menuName ? "All" : menuName);
    // Smooth scroll to food display
    setTimeout(() => {
      const element = document.getElementById('food-display');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-text">
        <h1>Explore our menu</h1>
        <p className='explore-menu-desc'>Dive into our curated selection of mouth-watering categories. From farm-fresh salads to authentic Italian pastas, our menu is designed to cater to every palate. Each dish is a testament to our commitment to quality and flavor.</p>
        <div className="explore-menu-header-flex">
          <div className="explore-menu-stats">
            <div className="stat-item"><span>50+</span><p>Dishes</p></div>
            <div className="stat-item"><span>10+</span><p>Categories</p></div>
            <div className="stat-item"><span>4.8</span><p>Rating</p></div>
          </div>
          <button className="view-all-btn" onClick={() => handleCategoryClick("All")}>View Full Menu</button>
        </div>
      </div>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => handleCategoryClick(item.menu_name)} key={index} className="explore-menu-list-item">
              <div className={`img-container ${category === item.menu_name ? "active" : ""}`}>
                <img src={item.menu_image} alt={item.menu_name} />
              </div>
              <p className={category === item.menu_name ? "active-text" : ""}>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu

