import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

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
import Divider from '@material-ui/core/Divider';
// import Modal from 'react-bootstrap/Modal';
import { addOrderInAPI, getPersonalData, updateOrderForm, cleanOrderForm } from '../../../redux/orderRedux';

const Component = ({ className, personalData, cartProducts, cleanCartContent, addOrder, updateOrderForm, cleanOrderForm }) => {

  const [paymentValue, setPaymentValue] = useState(''); // eslint-disable-line
  const [orderFormData, setOrderFormData] = useState('');
  // const [show, setShow] = useState(true);
  // const history = useHistory();

  const handleInputPayment = event => {
    // console.log(event.target.value);
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

  const refreshPage = () => {
    setTimeout(function () {
      window.location.reload();
    }, 400);
  };

  const handleAddOrder = e => {
    e.preventDefault();

    if (!order.personalData.email ||
      !order.personalData.phone ||
      !order.personalData.name ||
      !order.personalData.surname ||
      !order.personalData.payment ||
      !order.personalData.address ||
      !order.personalData.city) {
      alert('You can\'t leave required fields empty!');
    } else if (order.personalData.email.length < 2) {
      alert('Email can\'t be shorter than 2 characters');
    } else if (order.personalData.phone.length < 2) {
      alert('Phone can\'t be shorter than 2 characters');
    } else if (order.personalData.name.length < 2) {
      alert('Name can\'t be shorter than 2 characters');
    } else if (order.personalData.surname.length < 2) {
      alert('Surname can\'t be shorter than 2 characters');
    } else if (order.personalData.address.length < 5) {
      alert('Address nr can\'t be shorter than 5 numbers');
    } else if (order.personalData.city.length < 5) {
      alert('City nr can\'t be shorter than 5 numbers');
    } else {
      if (!order.orderContent.length) {
        alert('There is nothing in your cart yet, go back to homepage.');
      } else {
        // console.log('dzia??a przycisk');
        addOrder(order);
        alert('Order added successfully!');
        cleanCartContent();
        cleanOrderForm();
        // setShow(true);
        // window.location.reload();
        refreshPage();
      }
    }
  };

  const delivery = 20;
  let subtotal = 0;

  // const handleGoToHp = event => {
  //   setShow(false);
  //   history.push('/');
  // };

  // const handleClose = () => setShow(false);

  // const submitForm = (e) => {
  //   console.log('dzia??a submit');
  //   e.preventDefault();
  //   addOrder(order);
  //   alert('Post added successfully!');

  // };

  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h4>ORDER</h4>

        {cartProducts.map(product => {
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
                <TextField
                  disabled
                  id="outlined-disabled"
                  // label="Disabled"
                  multiline
                  rows={6}
                  defaultValue={product.comment}
                />
              </div>
              <div className={styles.quantityBox}>
                <h5>Quantity</h5>
                <input
                  type='text'
                  id='quantity'
                  name='quantity'
                  readOnly
                  value={product.quantity}
                />
              </div>
              <div className={styles.priceBox}>
                <h5>Price</h5>
                <div>{product.price}</div>
              </div>
              <Divider variant="middle" className={styles.dividerSection} />
            </section>
          );
        })}
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
                // onChange={handleOrderFormData}
                onChange={event => {
                  handleInputPayment(event);
                  handleOrderFormData(event);
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
        {/* <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Modal.Title>Thank you for your order!</Modal.Title>
            <Modal.Title>We will contact to you soon.</Modal.Title>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='basic' onClick={handleGoToHp}>
              Go to homepage
            </Button>
          </Modal.Footer>
        </Modal> */}
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
  cleanOrderForm: PropTypes.func,
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
  cleanOrderForm: arg => dispatch(cleanOrderForm(arg)),
});

const OrderContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Order,
  OrderContainer as Order,
  Component as OrderComponent,
};
