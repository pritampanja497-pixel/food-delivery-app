import React, { useContext } from "react";
import "./Card.css";
import { StoreContext } from "../../context/StroreContext";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="Card">
      <div className="Card-items">
        <div className="Card-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          const itemId = item.id || item._id;
          if (cartItems[itemId] > 0) {
            return (
              <div key={index}>
                <div className="Card-items-title Card-items-item">
                  <img src={typeof item.image === 'object' || (typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('data:') || item.image.startsWith('/src/') || item.image.startsWith('/assets/'))) ? item.image : url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[itemId]}</p>
                  <p>${item.price * cartItems[itemId]}</p>
                  <p onClick={() => removeFromCart(itemId)} className="cross">✕</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="card-bottom">
        <div className="card-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="card-promocode">
          <div>
            <p>If you have a Promo code, Enter it here</p>
            <div className="card-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
