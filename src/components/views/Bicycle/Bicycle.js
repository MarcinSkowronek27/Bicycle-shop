import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/bicyclesRedux';
import { useParams } from 'react-router';

import styles from './Bicycle.module.scss';

const Component = ({ className, allBicycles, props }) => {
  // const { id } = useParams();
  let id = props.match.params.id;
  const getPostById = id => allBicycles.find(item => item.id === id);
  console.log('id', id);
  console.log('getPost funkcja:', getPostById(id));
  return (
    <div className={clsx(className, styles.root)}>
      <div className={clsx(className, styles.bicyclesContainer)}>
        <Card key={allBicycles[id - 1].id} className={clsx(className, styles.card)}>
          <div className={styles.photo}>
            {allBicycles[id - 1].image &&
              <CardMedia
                component="img"
                height="250"
                image={allBicycles[id - 1].image}
                alt="bicycle-image"
              />
            }
            {allBicycles[id - 1].promo && <div className={styles.sale}>{allBicycles[id - 1].promo}</div>}
          </div>
          {/* <CardContent>
            <List>
              <ListItem>
                <Typography gutterBottom variant="h4" component="div">
                  {bicycle.title}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <div className={clsx(className, styles.details)}>
              <Typography className={styles.price}>
                <div className={styles.oldPrice}>{bicycle.oldPrice ? bicycle.oldPrice + 'PLN' : ''}</div>
                {bicycle.price && `Price: ${bicycle.price}PLN`}
              </Typography>
              <Typography className={styles.description}>
                {bicycle.description &&
                  <div>
                    <h4>Description:</h4> {bicycle.description}
                  </div>}
              </Typography>
            </div>
          </CardContent> */}
        </Card>
      </div>
    </div>
  );
};

Component.propTypes = {
  props: PropTypes.object,
  match: PropTypes.object,
  className: PropTypes.string,
  allBicycles: PropTypes.array,
  id: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  allBicycles: getAll(state),
  props,
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Bicycle,
  Container as Bicycle,
  Component as BicycleComponent,
};
