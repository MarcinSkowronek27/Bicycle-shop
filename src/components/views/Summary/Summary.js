import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllCart } from '../../../redux/cartRedux';

import styles from './Summary.module.scss';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const Component = ({ className, products }) => {

  const delivery = 20;
  let subtotal = 0;

  return (
    <div className={styles.root}>
      <Container className={styles.container} maxWidth='lg'>
        <h4>SUMMARY</h4>
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
            {products.map(product => {
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
                      defaultValue={product.comments}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      id='quantity'
                      name='quantity'
                      // defaultValue='1'
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
        <div className={styles.summary}>Delivery: {delivery}</div>
        <div className={styles.summary}>
          Total: {subtotal > 0 ? subtotal + delivery : 0}
        </div>
        <div className={styles.checkout}>
          <form className={clsx(className, styles.form)} noValidate autoComplete="off" action="/posts/add" method="POST" encType="multipart/form-data"
          // onSubmit={submitForm}
          >
            <TextField id="email" name="email" label="Email*" variant="outlined"
            // onChange={updateTextField}
            />
            <TextField id="phone" name="phone" label="Phone number*" variant="outlined"
            //  onChange={updateNumberField}
            />
            <TextField id="name" name="Name" label="Name*" variant="outlined"
            // onChange={updateTextField}
            />
            <TextField id="surname" name="Surname" label="Surname*" variant="outlined"
            // onChange={updateTextField}
            />
            <FormControl>
              <InputLabel id="paymentLabel">Payment</InputLabel>
              <Select
                labelId="paymentLabelSelect"
                id="payment"
                name="payment"
                value=''
              // onChange={updateTextField}
              >
                <MenuItem value={'Cash'}>Cash</MenuItem>
                <MenuItem value={'MasterCard'}>MasterCard</MenuItem>
              </Select>
            </FormControl>
            <TextField id="address" label="Address" variant="outlined"
            // onChange={updateTextField}
            />
            <TextField id="city" label="City" variant="outlined"
            // onChange={updateTextField}
            />
            <Button variant="contained" color="secondary" type="submit" className={clsx(className, styles.link)}
              onClick={event => {
                event.preventDefault();
                // return removeProducts();
              }}>
              SEND ORDER
            </Button>
          </form>

        </div>
      </Container>
    </div >
  );
};

Component.propTypes = {
  products: PropTypes.array,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  products: getAllCart(state),
  subtotal: 0,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const SummaryContainer = connect(mapStateToProps)(Component);

export {
  // Component as Summary,
  SummaryContainer as Summary,
  Component as SummaryComponent,
};
