import React from 'react';
import './MyOrder.css';
import { assets } from '../../assets/assets.js/frontend_assets/assets';
const MyOrder = () => {

  // Sample order data
  const orders = [
    {
      id: 1,
      items: "Burger x2, Pizza x1",
      amount: 450,
      status: "Food Processing"
    },
    {
      id: 2,
      items: "Pasta x1, Cold Drink x2",
      amount: 300,
      status: "Out for Delivery"
    },
    {
      id: 3,
      items: "Chicken Roll x3",
      amount: 250,
      status: "Delivered"
    }
  ];

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">

        {orders.map((order) => (
          <div className="my-orders-order" key={order.id}>

            <img src={order.img} alt="parcel" />

            <p>{order.items}</p>

            <p>₹{order.amount}</p>

            <p>Items: 3</p>

            <p>
              <span>&#x25cf;</span>{" "}
              <b>{order.status}</b>
            </p>

            <button>Track Order</button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyOrder;