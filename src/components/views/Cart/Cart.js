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
  updateItemComment,
} from '../../../redux/cartRedux';

import styles from './Cart.module.scss';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const Component = ({ products, removeProduct, updateQuantity, updateComment, comment }) => {

  const delivery = 20;
  let subtotal = 0;

  const [commentValue, setCommentValue] = useState(''); // eslint-disable-line

  const handleInputComment = event => {
    setCommentValue(event.target.value);
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
            {products.map((product, index) => {
              subtotal += product.price * product.quantity;
              console.log(product.id);
              return (
                <tr key={product.id}>
                  <td>
                    <div>{product.title}</div>
                    <div className={styles.photo}>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </td>
                  <td>
                    <TextField key={product.id}
                      id="text"
                      label="Customize your product"
                      name="text"
                      multiline
                      rows={6}
                      variant="outlined"
                      value={comment}
                      // helperText="Min. 20 characters"
                      onChange={event => {
                        handleInputComment(event);
                        updateComment(product.id, event.target.value);
                      }}
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
        <div className={styles.cartOrder}>Subtotal: {subtotal}</div>
        <div className={styles.cartOrder}>Delivery: {delivery}</div>
        <div className={styles.cartOrder}>
          Total: {subtotal > 0 ? subtotal + delivery : 0}
        </div>
        <div className={styles.checkout}>
          <NavLink exact to={'/bicycles/order'} activeClassName='active' className={styles.link}>
            <Button
            // onClick={event => {
            //   event.preventDefault();
            //   return removeProducts();
            // }}
            >
              GO TO ORDER
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
  updateComment: PropTypes.func,
  comment: PropTypes.string,
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
    updateComment: (id, value) => dispatch(updateItemComment(id, value)),
  };
};

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Cart,
  CartContainer as Cart,
  Component as CartComponent,
};
