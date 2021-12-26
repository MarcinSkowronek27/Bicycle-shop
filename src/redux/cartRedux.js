// import { initialState } from './initialState';
/* selectors */
export const getAllCart = ({ cart }) => cart.products;
// export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const REMOVE_PRODUCTS = createActionName('REMOVE_PRODUCTS');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');
const UPDATE_COMMENT = createActionName('UPDATE_COMMENT');
const CLEAN_CART_CONTENT = createActionName('CLEAN_CART_CONTENT');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const removeProduct = name => ({ name, type: REMOVE_PRODUCT });
export const removeProducts = () => ({ type: REMOVE_PRODUCTS });
export const updateQuantity = (quantity, id) => ({
  quantity,
  id,
  type: UPDATE_QUANTITY,
});
export const updateItemComment = (id, comment) => ({ id, comment, type: UPDATE_COMMENT });
export const cleanCartContent = payload => ({ payload, type: CLEAN_CART_CONTENT });

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  // let cart = {
  //   products: [
  //   ],
  // };
  switch (action.type) {
    case ADD_PRODUCT: {
      console.log(statePart.products);
      const inCart = statePart.products.find(product => (product.id === action.payload.id) ? 'undefined' : false);
      // const id = action.payload.id;
      // console.log(action.payload.id);
      // console.log('inCart1', inCart);
      return {
        ...statePart,
        products: inCart
          ? statePart.products.map(product =>
            product.id === action.payload.id
              ? { ...product, quantity: parseInt(product.quantity) + parseInt(action.payload.quantity) }
              : product
          )
          : [...statePart.products, action.payload],
      };
    }
    case REMOVE_PRODUCT: {
      // localStorage.setItem('cart', JSON.stringify(cart.products));
      return {
        ...statePart,
        products: statePart.products.filter(product => product.title !== action.name),
      };
    }
    case REMOVE_PRODUCTS: {
      return {
        ...statePart,
        products: [],
      };
    }
    case UPDATE_QUANTITY: {
      return {
        ...statePart,
        products: statePart.products.map(product => {
          if (product.title === action.id) {
            if (
              product.quantity >= 1 ||
              (product.quantity < 1 && action.quantity > 0)
            ) {
              return {
                ...product,
                quantity: product.quantity + action.quantity,
              };
            } else return { ...product };
          } else return { ...product };
        }),
      };
    }
    case UPDATE_COMMENT: {
      console.log(statePart);
      return {
        ...statePart,
        products: statePart.products.map(product => {
          // console.log('productid', product.title);
          // console.log('action.id', action.id);
          if (product.id === action.id) {
            // console.log('działa tutaj');
            return { ...product, comment: action.comment };
          }
          else return { ...product };
        }),
      };
    }
    case CLEAN_CART_CONTENT: {
      return {
        ...statePart,
        products: [],
      };
    }
    default:
      return statePart;
  }
};
