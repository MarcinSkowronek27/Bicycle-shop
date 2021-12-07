import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';
import { getAll } from '../../../redux/bicyclesRedux';

import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

const Component = ({ className, allBicycles, children }) => {

  return (
    <div className={clsx(className, styles.root)}>
      <div className={clsx(className, styles.bicyclesContainer)}>
        {allBicycles.map((bicycle, index) => (
          <Card key={bicycle.id} className={clsx(className, styles.card)} component={Link} href={`bicycle/${bicycle.id}`}>
            <div className={styles.photo}>
              {bicycle.image &&
                <CardMedia
                  component="img"
                  height="250"
                  image={bicycle.image}
                  alt="bicycle-image"
                />
              }
              {bicycle.promo && <div className={styles.sale}>{bicycle.promo}</div>}
            </div>
            <CardContent>
              <List>
                <ListItem>
                  <Typography gutterBottom variant="h4" component="div">
                    {bicycle.title}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              <div className={clsx(className, styles.details)}>
                <Typography className={styles.price} component={'span'}>
                  <div className={styles.oldPrice}>{bicycle.oldPrice ?  bicycle.oldPrice + 'PLN' : ''}</div>
                  {bicycle.price && `Price: ${bicycle.price}PLN`}
                </Typography>
                <Typography className={styles.description} component={'span'}>
                  {bicycle.description &&
                    <div>
                      <h4>Description:</h4> {bicycle.description}
                    </div>}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {children}
    </div >
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  allBicycles: PropTypes.array,
};

const mapStateToProps = state => ({
  allBicycles: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
