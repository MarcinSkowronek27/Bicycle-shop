import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/bicyclesRedux';
import { getAllCart, addProduct, updateQuantity } from '../../../redux/cartRedux';

import styles from './Bicycle.module.scss';

class BicyclePage extends React.Component {

  state = {
    id: null,
    // comment: '',
  };

  handleClick = (test) => {
    console.log(test + ' habababa');
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({
      id: id,
    });
  }

  // updateTextField = (event) => {

  //   this.setState({ comment: { [event.target.name]: event.target.value } });
  // }

  srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }


  render() {
    // const { id, title, image, price, quantity, addToCart } = this.props;
    const { addToCart, updateQuantity, carts } = this.props;
    // const id = this.state.id;
    const allBicycles = this.props.bicycles;
    const bicycle = allBicycles.filter(bicycle => bicycle.id == this.state.id);  // eslint-disable-line
    const handleAddToCart = () => {
      const cartPayload = {
        title: allBicycles[this.state.id - 1].title,
        id: allBicycles[this.state.id - 1].id,
        price: allBicycles[this.state.id - 1].price,
        image: allBicycles[this.state.id - 1].image,
        quantity: allBicycles[this.state.id - 1].quantity,
      };
      console.log(cartPayload);
      addToCart(cartPayload);
    };
    // console.log('id', id);
    // console.log('allBicycles', allBicycles);
    console.log('oneBicycle', bicycle);
    // console.log('oneBicycle', allBicycles[2].moreImage[0].image1);
    return (
      <div className={styles.root}>
        {bicycle.map(item => (
          <Grid container key={item.id} spacing={2} className={styles.container}>
            <Grid item xs={12} sm={6} lg={12} className={styles.containerImage}>
              <Grid key={item.id} container className={styles.gallery}>
                <Grid item xs={12} md={6} lg={6} className={styles.wrapperLeft}>
                  <img src={item.moreImage[0]} className={styles.imgLarge} alt='imgFirst' />
                </Grid>

                <Grid item xs={12} md={6} lg={6} className={styles.wrapperRight}>
                  <div className={`row pb-4 ${styles.wrapperSmall}`}>
                    <img src={item.moreImage[1]} alt='imgSecond' />
                  </div>
                  <div className={`row ${styles.wrapperSmall}`}>
                    <img src={item.moreImage[2]} alt='imgThird' />
                  </div>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12} sm={6} className={styles.description}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    my: 1,
                    gap: 3,
                  }}
                >
                  <h1>{item.title}</h1>
                </Box>
              </Grid>
              <Grid item xs={12} className={styles.break}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    my: 1,
                    gap: 3,
                  }}
                >
                  <div className={styles.oldPrice}>
                    {item.oldPrice ? item.oldPrice + ' PLN' : ''}
                  </div>
                  <div className={styles.price}>
                    {item.price} PLN
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    my: 1,
                    gap: 3,
                  }}
                >
                  <Button className={styles.cart}
                    onClick={event => {
                      event.preventDefault();
                      return handleAddToCart(bicycle.id, bicycle.title, bicycle.price, bicycle.image, bicycle.quantity);
                    }}
                  >
                    <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>ADD
                    TO CART
                  </Button>
                </Box>
              </Grid>
              {carts.map(product => {
                return (
                  <Grid  key={product.id} item xs={12} className={styles.break}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        my: 1,
                        gap: 5,
                      }}
                    >
                      <p className={styles.quantityText}>
                        <b>Quantity: </b>
                      </p>
                      <input
                        type='text'
                        id='quantity'
                        name='quantity'
                        value={product.quantity}
                        className={styles.quantityInput}
                      />
                      <Button className={styles.icon}
                        onClick={event => {
                          event.preventDefault();
                          updateQuantity(-1, product.id);
                        }}>
                        <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
                      </Button>
                      <Button className={styles.icon}
                        onClick={event => {
                          event.preventDefault();
                          updateQuantity(1, product.id);
                        }}>
                        <FontAwesomeIcon icon={faPlus}>+</FontAwesomeIcon>
                      </Button>
                    </Box>
                  </Grid>
                );
              })}

              <Grid item xs={12} className={styles.break}>
                <Box
                // sx={{
                //   display: 'flex',
                //   justifyContent: 'flex-start',
                //   flexWrap: 'wrap',
                //   alignItems: 'flex-start',
                //   my: 1,
                //   gap: 3,
                // }}
                >
                  <h4>Quick overview:</h4>
                  <p>{item.description}</p>
                </Box>
              </Grid>
              <Grid item xs={12} className={styles.break}>
                <Box sx={{ my: 1, gap: 3 }}>
                  <p>
                    <b>Availability:</b> In stock
                  </p>
                  <p>
                    <b>Category:</b> {item.category}
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}


BicyclePage.propTypes = {
  props: PropTypes.object,
  match: PropTypes.object,
  className: PropTypes.string,
  bicycles: PropTypes.array,
  carts: PropTypes.array,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  promo: PropTypes.string,
  category: PropTypes.string,
  quantity: PropTypes.number,
  addToCart: PropTypes.func,
  updateQuantity: PropTypes.func,
};

const mapStateToProps = state => ({
  bicycles: getAll(state),
  carts: getAllCart(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: cartPayload => dispatch(addProduct(cartPayload)),
  updateQuantity: (quantity, id) => dispatch(updateQuantity(quantity, id)),
});

const BicyclePageContainer = connect(mapStateToProps, mapDispatchToProps)(BicyclePage);

export {
  // Component as Bicycle,
  BicyclePageContainer as Bicycle,
  BicyclePage as BicycleComponent,
};
