import React from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/cartRedux';

import styles from './Cart.module.scss';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const Component = ({ products, className, children }) => {

  const delivery = 20;
  let subtotal = 0;

  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h5>Your cart</h5>
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

              return (
                <tr key={product.productId}>
                  <td>
                    <div>{product.name}</div>
                    <div className={styles.photo}>
                      <img src={product.image} alt={product.name} />
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
                      // helperText="Min. 20 characters"
                      // onChange={updateTextField}
                    />
                  </td>
                  <td>
                    <Button
                      variant='quantity'
                    // onClick={event => {
                    //   event.preventDefault();
                    //   updateQuantity(-1, product.productId);
                    // }}
                    >
                      <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
                    </Button>
                    <input
                      type='text'
                      id='quantity'
                      name='quantity'
                      value={product.quantity}
                    />
                    <Button
                      variant='quantity'
                    // onClick={event => {
                    //   event.preventDefault();
                    //   updateQuantity(1, product.productId);
                    // }}
                    >
                      <FontAwesomeIcon icon={faPlus}>+</FontAwesomeIcon>
                    </Button>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.price * product.quantity}</td>
                  <td>
                    <Button
                      variant='trash'
                    // onClick={event => {
                    //   event.preventDefault();
                    //   return removeProduct(product.name);
                    // }}
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
          <NavLink exact to={'/'} activeClassName='active' className={styles.link}>
            <Button
              variant='small'
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
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  products: getAll(state),
  subtotal: 0,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const CartContainer = connect(mapStateToProps)(Component);

export {
  // Component as Cart,
  CartContainer as Cart,
  Component as CartComponent,
};
