/* selectors */
export const getAll = ({ cart }) => cart.products;
export const getCount = ({ cart }) => cart.products.length;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_PRODUCT = createActionName('ADD_PRODUCT');
const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
const REMOVE_PRODUCTS = createActionName('REMOVE_PRODUCTS');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');

/* action creators */
export const addProduct = payload => ({ payload, type: ADD_PRODUCT });
export const removeProduct = name => ({ name, type: REMOVE_PRODUCT });
export const removeProducts = () => ({ type: REMOVE_PRODUCTS });
export const updateQuantity = (quantity, id) => ({
  quantity,
  id,
  type: UPDATE_QUANTITY,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const cart = {
        products: [
        ],
      };
      const id = action.payload.id;
      // console.log(cart);
      let findId = statePart.products.find(product => product.id === id);
      if (typeof findId !== 'undefined') {
        return {
          ...statePart,
          products: statePart.products.map(product => {
            cart.products.push(product);
            localStorage.setItem('cart', JSON.stringify(product));
            console.log(product);
            cart.products.push(product);
            if (product.id === id) return { ...product, quantity: product.quantity + 1 };
            return { ...product };
          }),
        };
      } else {
        return {
          ...statePart,
          products: [...statePart.products, action.payload],
        };
      }
    }
    case REMOVE_PRODUCT: {
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
          if (product.id === action.id) {
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
    default:
      return statePart;
  }
}
