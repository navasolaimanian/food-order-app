import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import React from 'react';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmiting, setDidsSubmiting] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const addFormComponent = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch('https://react-http-ed7cd-default-rtdb.firebaseio.com/order.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderdItems: cartCtx.items
      })
    })
    setIsSubmiting(false);
    setDidsSubmiting(true);
    cartCtx.clearCart();
  }

  const modalAction = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={addFormComponent}>Order</button>}
  </div>;

  const checkoutAction = <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModal = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {!isCheckout && modalAction}
    {isCheckout && checkoutAction}

  </React.Fragment >

  const isSubmitingModalContent = <p>sending order data ...</p>;

  const didSubmitingMadalContent = <React.Fragment>
    <p>successfully sent the order</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>;
  </React.Fragment>



  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmiting && cartModal}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmiting && didSubmitingMadalContent}
    </Modal>
  );
};

export default Cart;
