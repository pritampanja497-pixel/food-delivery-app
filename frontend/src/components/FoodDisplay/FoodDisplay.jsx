import React,{useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StroreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

  const {food_list, searchQuery} = useContext(StoreContext)

  // Filter the food list based on the search query
  const filtered_food_list = food_list.filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    return true; // if no search query, include all
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filtered_food_list.length === 0 ? (
          <p className="no-items">No dishes match your search.</p>
        ) : (
          filtered_food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <FoodItem key={index} id={item.id || item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
            }
            return null;
          })
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
