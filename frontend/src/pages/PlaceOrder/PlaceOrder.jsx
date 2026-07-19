import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StroreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{
      event.preventDefault();

      if (!showPaymentOptions) {
        setShowPaymentOptions(true);
        return;
      }

      let orderItems =[];
      food_list.map((item)=>{
          const itemId = item.id || item._id;
          if (cartItems[itemId]>0) {
            let itemInfo = {...item};
            itemInfo["quantity"] = cartItems[itemId]
            orderItems.push(itemInfo)
          }
      })
      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2
      }
      
      if (paymentMethod === 'stripe') {
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        if (response.data.success) {
          const {session_url} = response.data;
          window.location.replace(session_url)
        }
        else{
          alert("Error")
        }
      } else {
        alert(`Order placed successfully using ${paymentMethod.toUpperCase()}!`);
        navigate('/');
      }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/Card')
    }else if(getTotalCartAmount()===0){
        navigate('/Card')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='Last Name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className="multi-fields">
              <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
              <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
              <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode}  type="text" placeholder='Pincode' />
              <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="card-total">
          <h2>Card Totals</h2>
          <div>
          <div className="card-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          {showPaymentOptions ? (
            <div className="payment-options">
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>Select Payment Method</h3>
              <div className="payment-option" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                <input type="radio" id="stripe" name="payment" value="stripe" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'stripe'} />
                <label htmlFor="stripe" style={{cursor: 'pointer'}}>Stripe (Credit/Debit)</label>
              </div>
              <div className="payment-option" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                <input type="radio" id="cod" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'cod'} />
                <label htmlFor="cod" style={{cursor: 'pointer'}}>Cash On Delivery</label>
              </div>
              <div className="payment-option" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
                <input type="radio" id="upi" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'upi'} />
                <label htmlFor="upi" style={{cursor: 'pointer'}}>UPI</label>
              </div>
              <button type='submit' >PLACE ORDER</button>
            </div>
          ) : (
            <button type='submit' >PROCEED TO PAYMENT</button>
          )}
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
