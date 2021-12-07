import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import chain from '../../../icons/chain.png';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Component(className, props) {

  return (
    <div className={clsx(className, styles.root)}>
      <HideOnScroll {...props}>
        <AppBar className={styles.app_bar}>
          <Toolbar>
            <Typography variant="h6" component="div" className={styles.typography} >
              <div className='container'>
                <div className='row align-items-center'>
                  <div className={`col text-left ${styles.phoneNumber}`}>
                    <p>
                      <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> 780 - 350 -
                      222
                    </p>
                  </div>
                </div>
              </div>
              <NavLink exact to={'/'} activeClassName='active'>
                <img src={chain} width='100' height='100' alt='chain_icon' />
              </NavLink>
              <h1 className={styles.font_style}>Bicycles shop</h1>
              {/* <div className={`col text-right ${styles.cart}`}> */}
              <NavLink exact to={'/bicycle/cart'} activeClassName='active' className={styles.cart}>
                <button className={styles.cartBox}>
                  <div className={styles.cartIcon}>
                    <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
                  </div>
                  {/* <div className={styles.cartCounter}>{cartCount}</div> */}
                </button>
              </NavLink>
              {/* </div> */}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
