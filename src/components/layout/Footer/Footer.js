import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Footer.module.scss';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Col className={styles.icons}>
      <Nav.Link><i className="bi bi-facebook"></i></Nav.Link>
      <Nav.Link><i className="bi bi-instagram"></i></Nav.Link>
      <Nav.Link><i className="bi bi-twitter"></i></Nav.Link>
    </Col>
    <Col className={styles.paragraph}>
      <p>&copy; 2021 <span>Bicycle-Shop</span> Group. All rights reserved.</p>
    </Col>
  </div>
);

Component.propTypes = {
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
