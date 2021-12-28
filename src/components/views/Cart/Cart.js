import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

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

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const Component = ({ cartProducts, removeProduct, updateQuantity, updateComment, comment }) => {

  const delivery = 20;
  let subtotal = 0;

  const history = useHistory();

  const [cartQnty, setCartQnty] = useState(0);

  useEffect(() => {
    let count = 0;
    cartProducts.forEach(product => {
      count += parseInt(product.quantity);
    });
    setCartQnty(count);
  }, [cartProducts, cartQnty]);

  const handleGoTo = event => {
    history.push('/');
  };

  const [commentValue, setCommentValue] = useState(''); // eslint-disable-line

  const handleInputComment = (event, id) => {
    setCommentValue(event.target.value);
    updateComment(id, event.target.value);
  };

  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h4>YOUR CART</h4>
        {!cartProducts.length ? (
          <p>There is nothing in your cart yet, go back to homepage.</p>
        ) :
          cartProducts.map((product, index) => {
            // console.log(product.id);
            subtotal += product.price * product.quantity;
            return (
              <section key={product.id} className={styles.productSection}>
                <div className={styles.productBox}>
                  <h5>Product</h5>
                  <div className={styles.productTitle}>{product.title}</div>
                  <div className={styles.photo}>
                    <img src={product.image} alt={product.title} />
                  </div>
                </div>
                <div className={styles.commentsBox}>
                  <h5>Comments</h5>
                  <TextField key={product.id}
                    id="text"
                    label="Customize"
                    name="text"
                    multiline
                    rows={6}
                    variant="outlined"
                    value={product.comment}
                    // helperText="Min. 20 characters"
                    onChange={event => { handleInputComment(event, product.id); }}
                  />
                </div>
                <div className={styles.quantityBox}>
                  <h5>Quantity</h5>
                  <div className={styles.quantityButton}>
                    <Button
                      onClick={event => {
                        event.preventDefault();
                        console.log(product.id);
                        if (product.quantity > 1) updateQuantity(-1, product.title);
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
                  </div>
                </div>
                <div className={styles.priceBox}>
                  <h5>Price</h5>
                  <div>{product.price}</div>
                </div>
                <div className={styles.totalBox}>
                  <h5>Total</h5>
                  <div>{product.price * product.quantity}</div>
                </div>
                <div className={styles.removeBox}>
                  <h5>Remove</h5>
                  <Button
                    onClick={event => {
                      event.preventDefault();
                      return removeProduct(product.title);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt}>Remove</FontAwesomeIcon>
                  </Button>
                </div>
                <Divider variant="middle" className={styles.dividerSection} />
              </section>
            );
          })
        }
        {!cartProducts.length ? (
          ''
        ) :
          <div>
            <div className={styles.cartOrder}>Subtotal: {subtotal}</div>
            <div className={styles.cartOrder}>Delivery: {delivery}</div>
            <div className={styles.cartOrder}>
              Total: {subtotal > 0 ? subtotal + delivery : 0}
            </div>
            <div className={styles.checkout}>
              <Button onClick={handleGoTo} className={styles.linkHome}>Homepage</Button>
              <NavLink exact to={'/bicycles/order'} activeClassName='active' className={styles.link}>
                <Button
                // onClick={event => {
                //   event.preventDefault();
                //   addOrder();
                // }}
                >
                  GO TO ORDER
                </Button>
              </NavLink>
            </div>
          </div>
        }
      </Container >
    </div >
  );
};

Component.propTypes = {
  cartProducts: PropTypes.array,
  removeProduct: PropTypes.func,
  removeProducts: PropTypes.func,
  updateQuantity: PropTypes.func,
  updateComment: PropTypes.func,
  id: PropTypes.string,
  comment: PropTypes.string,
};

const mapStateToProps = state => ({
  cartProducts: getAllCart(state),
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
