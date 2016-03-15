import request from 'axios';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    RECEIVE_PRODUCTS
} from '../constants/actions'

/**
 * Generate action when we send request to fetch products
 * @function requestProducts
 * @returns {Object} Action object
 */
export function requestProducts() {
    return {type: FETCH_PRODUCTS_REQUEST}
}

/**
 * Generate action if fetch request was failures
 * @function fetchProductsSuccess
 * @param {Array} Products
 * @returns {Object} Action object
 */
export function fetchProductsSuccess(products) {
    return {type: FETCH_PRODUCTS_SUCCESS, products}
}

/**
 * Generate action if fetch request was successful
 * @function fetchProductsFailure
 * @returns {Object} Action object
 */
export function fetchProductsFailure() {
    return {type: FETCH_PRODUCTS_FAILURE}
}

/**
 * Generate action for add products to state
 * @function receiveProducts
 * @param {Array} Products
 * @returns {Object} Action object
 */
export function receiveProducts(products) {
    return {type: RECEIVE_PRODUCTS, products}
}

/**
 * Fetch products from server
 * @function fetchProducts
 * @returns {Object} Promise
 */
export function fetchProducts() {
    return function (dispatch) {
        dispatch(requestProducts());

        return request.get('./data/cars.json')
            .then(({data})  => {
                dispatch(fetchProductsSuccess(data));
                dispatch(receiveProducts(data));
            })
            .catch(() => dispatch(fetchProductsFailure()));
    };
}
