import Axios from 'axios';

/* selectors */
export const getAll = ({ bicycles }) => bicycles.data;
export const getOneBicycle = ({ bicycles }) => bicycles.oneBicycle;

/* action name creator */
const reducerName = 'bicycles';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE_BICYCLE = createActionName('FETCH_ONE_BICYCLE');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOneBicycle = payload => ({ payload, type: FETCH_ONE_BICYCLE });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { bicycles } = getState();
    if (bicycles.data.length === 0 && bicycles.loading.active === false) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/bicycles')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOneFromAPI = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted);

    Axios
      .get(`http://localhost:8000/api/bicycles/${id}`)
      .then(res => {
        dispatch(fetchOneBicycle(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_BICYCLE: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneBicycle: action.payload,
      };
    }
    default:
      return statePart;
  }
};
