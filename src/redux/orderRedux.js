import Axios from 'axios';
import { API_URL } from '../config';


/* selectors */
// export const getAllOrder = ({ order }) => order.data;
export const getPersonalData = ({ order }) => order.personalData;

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_ORDER = createActionName('ADD_ORDER');
const UPDATE_ORDER_FORM = createActionName('UPDATE_ORDER_FORM');
const CLEAN_ORDER_FORM = createActionName('CLEAN_ORDER_FORM');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addOrder = payload => ({ payload, type: ADD_ORDER });
export const updateOrderForm = payload => ({ payload, type: UPDATE_ORDER_FORM });
export const cleanOrderForm = payload => ({ payload, type: CLEAN_ORDER_FORM });

/* thunk creators */
// export const addOrderInAPI = (order) => {

//   const newOrder = { ...order };
//   return (dispatch, getState) => {
//     Axios
//       .post(`${API_URL}/orders`, newOrder)
//       .then(res => {
//         dispatch(addOrder(res.data));
//       })
//       .catch(err => {
//         dispatch(fetchError(err.message || true));
//       });
//   };
// };

export const addOrderInAPI = newOrder => {
  return (dispatch, getState) => {
    Axios
      .post(`${API_URL}/orders`, newOrder)
      .then(res => {
        dispatch(addOrder(res.data));
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
    case ADD_ORDER: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case UPDATE_ORDER_FORM: {
      // console.log(action.payload.email);
      console.log(action.payload);
      return {
        ...statePart,
        personalData: {
          email: action.payload.email,
          phone: action.payload.phone,
          name: action.payload.name,
          // surname: action.payload.surname,
          // payment: action.payload.payment,
          // address: action.payload.address,
          // city: action.payload.city,
        },
      };
    }
    case CLEAN_ORDER_FORM: {
      return {
        ...statePart,
        data: [],
        personalData: {},
      };
    }
    default:
      return statePart;
  }
};
