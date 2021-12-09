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

import styles from './Bicycle.module.scss';

class BicyclePage extends React.Component {

  state = {
    id: null,
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

  srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  render() {
    // const id = this.state.id;
    const allBicycles = this.props.bicycles;
    // console.log('id', id);
    console.log('allBicycles', allBicycles);
    console.log('oneBicycle', allBicycles[2].moreImage[0].image1);
    const bicycle = allBicycles.filter(bicycle => bicycle.id == this.state.id);  // eslint-disable-line
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
                    onClick={() => this.handleClick('rower')}>
                    <FontAwesomeIcon icon={faShoppingBasket}></FontAwesomeIcon>ADD
                    TO CART
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} className={styles.break}>
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
                    defaultValue={item.quantity}
                    className={styles.quantityInput}
                  />
                  <Button className={styles.icon}>
                    <FontAwesomeIcon icon={faMinus}>-</FontAwesomeIcon>
                  </Button>
                  <Button className={styles.icon}>
                    <FontAwesomeIcon icon={faPlus}>-</FontAwesomeIcon>
                  </Button>
                </Box>
              </Grid>
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
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  bicycles: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const BicyclePageContainer = connect(mapStateToProps)(BicyclePage);

export {
  // Component as Bicycle,
  BicyclePageContainer as Bicycle,
  BicyclePage as BicycleComponent,
};
