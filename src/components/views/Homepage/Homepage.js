import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';
import { getAll, fetchPublished } from '../../../redux/bicyclesRedux';

import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
// import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Component = ({ className, allBicycles, children, fetchPublishedBicycles }) => {

  // const history = useHistory();

  // const handleGoTo = (event, id) => {
  // console.log('link', `bicycle/` + id);
  //   history.push(`bicycle/` + id);
  // };
  fetchPublishedBicycles();
  return (
    <div className={clsx(className, styles.root)}>
      <div className={clsx(className, styles.bicyclesContainer)}>
        {allBicycles.map((bicycle, index) => (
          <Card key={bicycle._id} className={clsx(className, styles.card)} component={NavLink}
            // onClick={event => handleGoTo(event, bicycle._id)}
            exact to={`/bicycle/${bicycle._id}`}
          // tutaj powyżej był taki kod href={`/bicycle/${bicycle._id}`} i on nie działał prawidłowo, jeżeli chodzi o "pamięć" koszyka. jeżeli używam komponentu NavLink muszę mieć parametr 'exact to' wtedy klikając na link strona nie będzie się przeładowywać TIPS
          // jeżeli tutaj POWYŻEJ dla href byłoby zapisane bicycle/${bicycle._id} bez slasha przed pierwszym bicycle, to strona by się przeładowywała. TIPS
          // żeby strona się nie przeładowywała po kliknięciu na inną podstronę, wystarczy użyć hooka useHistory() i użyć np. w formie funkcji handleGoTo TIPS
          >
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
                  <div className={styles.oldPrice}>{bicycle.oldPrice ? bicycle.oldPrice + 'PLN' : ''}</div>
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
  fetchPublishedBicycles: PropTypes.func,
};

const mapStateToProps = state => ({
  allBicycles: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedBicycles: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
