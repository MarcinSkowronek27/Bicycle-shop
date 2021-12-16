import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import {
  getAllCart,
  addProduct,
  removeProduct,
  updateQuantity,
} from '../../../redux/cartRedux';

import styles from './Cart.module.scss';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const Component = ({ products, removeProduct, updateQuantity }) => {

  const delivery = 20;
  let subtotal = 0;

  // const cart = {
  //   products: [

  //   ],
  // };
  const [commentValue, setCommentValue] = useState('');
  const updateTextField = (e) => {
    const onebicycle = products.filter(bicycle => bicycle.id === e.currentTarget.id);
    console.log(onebicycle);
    if (onebicycle)
      console.log(e.currentTarget);
    setCommentValue(e.currentTarget.value);
  };
  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h5>YOUR CART</h5>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Comments</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              subtotal += product.price * product.quantity;
              console.log(product);
              return (
                <tr key={product.id}>
                  <td>
                    <div>{product.title}</div>
                    <div className={styles.photo}>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </td>
                  <td>
                    <TextField
                      id="text"
                      label="Customize your product"
                      name="text"
                      multiline
                      rows={6}
                      variant="outlined"
                      value={commentValue}
                      // helperText="Min. 20 characters"
                      onChange={updateTextField}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={event => {
                        event.preventDefault();
                        updateQuantity(-1, product.title);
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
                    </Button>
                    <input
                      type='text'
                      id='quantity'
                      name='quantity'
                      // defaultValue='1'
                      value={product.quantity}
                    />
                    <Button
                      onClick={event => {
                        event.preventDefault();
                        updateQuantity(1, product.title);
                        // addToCart();
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus}>+</FontAwesomeIcon>
                    </Button>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.price * product.quantity}</td>
                  <td>
                    <Button
                      onClick={event => {
                        event.preventDefault();
                        // console.log(product.name);
                        return removeProduct(product.title);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt}>Remove</FontAwesomeIcon>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.cartSummary}>Subtotal: {subtotal}</div>
        <div className={styles.cartSummary}>Delivery: {delivery}</div>
        <div className={styles.cartSummary}>
          Total: {subtotal > 0 ? subtotal + delivery : 0}
        </div>
        <div className={styles.checkout}>
          <NavLink exact to={'/bicycles/summary'} activeClassName='active' className={styles.link}>
            <Button
            // onClick={event => {
            //   event.preventDefault();
            //   return removeProducts();
            // }}
            >
              GO TO SUMMARY
            </Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

Component.propTypes = {
  products: PropTypes.array,
  removeProduct: PropTypes.func,
  removeProducts: PropTypes.func,
  updateQuantity: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAllCart(state),
  subtotal: 0,
});

const mapDispatchToProps = dispatch => {
  return {
    addProduct: id => dispatch(addProduct(id)),
    removeProduct: name => dispatch(removeProduct(name)),
    updateQuantity: (quantity, id) =>
      dispatch(updateQuantity(quantity, id)),
  };
};

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  CartContainer as Cart,
  Component as CartComponent,
};
