import request from 'axios';
import {
    ADD_TO_CART, REMOVE_FROM_CART,
    CLEAR_CART, SORT_CART,
    UPDATE_QUANTITY_CART,
    CHECKOUT_REQUEST, CHECKOUT_SUCCESS,
    CHECKOUT_FAILURE
} from '../constants/actions'

/**
 * Generate action for add product to cart
 * @param {number} productId
 * @returns {Object} Action object
 */
export function addToCart(productId) {
  return { type: ADD_TO_CART, productId }
}

/**
 * Generate action for remove product from cart
 * @param {number} productId
 * @returns {Object} Action object
 */
export function removeFromCart(productId) {
  return { type: REMOVE_FROM_CART, productId }
}

/**
 * Generate action for update quantity product in cart
 * @param {number} productId
 * @param {string} direction (INCREMENT or DECREMENT)
 * @see QUANTITY_TYPES_CART in constants/action.js
 * @returns {Object} Action object
 */
export function updateQuantityInCart(productId, direction) {
  return { type: UPDATE_QUANTITY_CART, productId, direction }
}

/**
 * Generate action for sort products in cart
 * @param {string} key name of attribute to sort
 * @param {string} order (asc or desc)
 * @see SORT_ORDER in constants/sort.js
 * @returns {Object} Action object
 */
export function sortCart(key, order) {
  return { type: SORT_CART, key, order }
}

/**
 * Generate action when we send request to checkout
 * @returns {Object} Action object
 */
export function checkoutRequest() {
  return { type: CHECKOUT_REQUEST }
}

/**
 * Generate action if checkout request was failures
 * @returns {Object} Action object
 */
export function checkoutRequestFailure() {
  return { type: CHECKOUT_FAILURE }
}

/**
 * Generate action if checkout request was success
 * @returns {Object} Action object
 */
export function checkoutRequestSuccess() {
  return { type: CHECKOUT_SUCCESS }
}

/**
 * Generate action for clean cart
 * @returns {Object} Action object
 */
export function cleanCart() {
  return { type: CLEAR_CART }
}

/**
 * Get cart products by itemsIds from cart
 * @see initialState in reducers/cart.js
 * @param {Object} state
 * @returns {Array} products
 */
export function getCartProducts(state) {
    let products = state.cart.itemsIds.map((idProduct, index) => Object.assign(
        {
            quantity: state.cart.quantityById[idProduct],
            position: index
        },
        state.products[idProduct]
    ));

    return products;
}

export function checkout() {
    return (dispatch, getState) => {
        dispatch(checkoutRequest());
        /*
         * TODO: В реальной жизни должен быть post запрос
         * return request.post('/checkout', getState().cart)
         * .then(()  => dispatch(checkoutRequestSuccess()))
         * .catch(() => dispatch(checkoutRequestFailure()));
         */
        return request.get('./data/checkout.json')
            .then(()  => dispatch(checkoutRequestSuccess()))
            .catch(() => dispatch(checkoutRequestFailure()));
    };
}
