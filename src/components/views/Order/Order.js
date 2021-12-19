import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllCart, cleanCartContent } from '../../../redux/cartRedux';

import styles from './Order.module.scss';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { addOrderInAPI, getPersonalData, updateOrderForm } from '../../../redux/orderRedux';

const Component = ({ className, personalData, cartProducts, cleanCartContent, addOrder, updateOrderForm }) => {

  const [paymentValue, setPaymentValue] = useState(''); // eslint-disable-line
  const [orderFormData, setOrderFormData] = useState('');

  const handleInputPayment = event => {
    console.log(event.target.value);
    setPaymentValue(event.target.value);
  };

  useEffect(() => {
    updateOrderForm(orderFormData);
  }, [orderFormData, updateOrderForm]);

  const handleOrderFormData = event => {
    setOrderFormData({
      ...orderFormData,
      [event.target.name]: event.target.value,
    });
  };

  const order = {
    orderContent: cartProducts,
    personalData,
  };
  // console.log('personalData', order.personalData);

  const handleAddOrder = e => {
    e.preventDefault();
    // if (!order.orderContent.length) {
    // alert('There is nothing in your cart yet, go back to homepage.');
    // } else {
    // console.log('działa przycisk');
    addOrder(order);
    // addOrderInAPI(order);
    // cleanCartContent();
    // cleanOrderForm();
    // }
  };

  const delivery = 20;
  let subtotal = 0;

  // const submitForm = (e) => {
  //   console.log('działa submit');
  //   e.preventDefault();
  //   addOrder(order);
  //   alert('Post added successfully!');

  // };

  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h4>ORDER</h4>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Comments</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map(product => {
              subtotal += product.price * product.quantity;

              return (
                <tr key={product.id}>
                  <td className={styles.tdPhoto}>
                    <div>{product.title}</div>
                    <div className={styles.photo}>
                      <img src={product.image} alt={product.title} />
                    </div>
                  </td>
                  <td>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      // label="Disabled"
                      multiline
                      rows={6}
                      defaultValue={product.comment}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      id='quantity'
                      name='quantity'
                      readOnly
                      value={product.quantity}
                    />
                  </td>
                  <td>{product.price}</td>
                  <td>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.order}>Delivery: {delivery}</div>
        <div className={styles.order}>
          Total: {subtotal > 0 ? subtotal + delivery : 0}
        </div>
        <div className={styles.checkout}>
          <form className={clsx(className, styles.form)} noValidate autoComplete="off" action="/orders" method="POST" encType="multipart/form-data"
          // onSubmit={submitForm}
          >
            <TextField id="email" name="email" label="Email*" variant="outlined"
              onChange={handleOrderFormData}
            />
            <TextField id="phone" name="phone" label="Phone number*" variant="outlined"
              onChange={handleOrderFormData}
            />
            <TextField id="name" name="name" label="Name*" variant="outlined"
              onChange={handleOrderFormData}
            />
            <TextField id="surname" name="surname" label="Surname*" variant="outlined"
              onChange={handleOrderFormData}
            />
            <FormControl>
              <InputLabel id="paymentLabel">Payment</InputLabel>
              <Select
                labelId="paymentLabelSelect"
                id="payment"
                name="payment"
                value={paymentValue}
                onChange={event => {
                  handleInputPayment(event);
                }}
              >
                <MenuItem value={'Cash'}>Cash</MenuItem>
                <MenuItem value={'MasterCard'}>MasterCard</MenuItem>
              </Select>
            </FormControl>
            <TextField id="address" label="Address" name="address" variant="outlined"
              onChange={handleOrderFormData}
            />
            <TextField id="city" label="City" name="city" variant="outlined"
              onChange={handleOrderFormData}
            />
            <Button variant="contained" color="secondary"
              // type="submit"
              className={clsx(className, styles.link)}
              onClick={handleAddOrder}>
              SEND ORDER
            </Button>
          </form>

        </div>
      </Container>
    </div >
  );
};

Component.propTypes = {
  cartProducts: PropTypes.array,
  className: PropTypes.string,
  personalData: PropTypes.object,
  cleanCartContent: PropTypes.func,
  addOrderInAPI: PropTypes.func,
  updateOrderForm: PropTypes.func,
  addOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  cartProducts: getAllCart(state),
  personalData: getPersonalData(state),
  subtotal: 0,
});

const mapDispatchToProps = dispatch => ({
  addOrder: arg => dispatch(addOrderInAPI(arg)),
  updateOrderForm: arg => dispatch(updateOrderForm(arg)),
  cleanCartContent: arg => dispatch(cleanCartContent(arg)),
});

const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Order,
  OrderContainer as Order,
  Component as OrderComponent,
};
