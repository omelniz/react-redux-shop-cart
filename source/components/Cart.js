import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CartList from './CartList'
import CartItem from './CartItem'
import {QUANTITY_TYPES_CART} from '../constants/actions'
import {getCartProducts} from './../actions/cart'
import {sortArrayByKey} from './../helpers/stableSort';
import {
    addToCart, removeFromCart, sortCart,
    checkout, updateQuantityInCart, cleanCart
} from './../actions/cart'

/**
 * Cart Component
 * @class Cart <React.Component>
 */
class Cart extends Component {
    /**
     * Constructor
     * @function constructor
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.dispatch = props.dispatch;
    }

    /**
     * Generate random productId and add product to cart
     * @function addRandomProduct
     */
    addRandomProduct() {
        if (this.props.countProductsInShop > 0) {
            let productId = Math.floor(Math.random() * this.props.countProductsInShop);
            this.addProduct(productId);
        }
    }

    /**
     * Calculate total price
     * @function getTotal
     * @returns {number} total
     */
    getTotal() {
        let total = [0, ...this.props.products].reduce((total, product) => {
            return total + product.price * product.quantity;
        });

        return total;
    }

    /**
     * Dispatch Update product quantity
     * @function updateProductQuantity
     * @param {number} productId
     * @param {string} direction (INCREMENT or DECREMENT)
     * @see QUANTITY_TYPES_CART in constants/action.js
     */
    updateProductQuantity(productId, direction) {
        this.dispatch(updateQuantityInCart(productId, direction));
    }

    /**
     * Dispatch Add product to cart
     * @function addProduct
     */
    addProduct(productId) {
        this.dispatch(addToCart(productId));
    }

    /**
     * Dispatch Remove product from cart
     * @function addProduct
     */
    removeProduct(productId) {
        this.dispatch(removeFromCart(productId));
    }

    /**
     * Dispatch action to send cart to server
     * @function buyAll
     */
    buyAll() {
        if (this.isEmpty()) {
            this.dispatch(checkout());
            alert("Thanks for purchase!")
            this.clear();
        }
    }

    /**
     * Dispatch sort action
     * @function sort
     * @param {string} key name of attribute to sort
     * @param {string} order (asc or desc)
     * @see SORT_ORDER in constants/sort.js
     */
    sort(key, order) {
        this.dispatch(sortCart(key, order));
    }

    /**
     * Dispatch clear action
     * @function buyAll
     */
    clear() {
        this.dispatch(cleanCart());
    }

    /**
     * Check products count in cart
     * @function isEmpty
     * @returns {Boolean}
     */
    isEmpty() {
        return Boolean(this.props.products.length);
    }

    /**
     * Sorting products and return their
     * @function getProducts
     * @returns {Array} Sorted products
     */
    getProducts() {
        const SORT_KEY = this.props.sort.key;
        const SORT_ORDER = this.props.sort.order;

        return sortArrayByKey(this.props.products, SORT_KEY, SORT_ORDER);
    }

    /**
     * Render component
     * @function render
     * @returns {Function}
     */
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1>React Shopping Cart</h1>
                        <p>
                            <button type="button" className="btn btn-default" onClick={this.addRandomProduct.bind(this)}>
                                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                Add random product to cart
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.buyAll.bind(this)}>
                                <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                Buy all now for {this.getTotal()}$
                            </button>
                            <button type="button" className="btn btn-link pull-right" onClick={this.clear.bind(this)}>Clear cart</button>
                        </p>
                        <CartList onSort={this.sort.bind(this)} sortKey={this.props.sort.key} sortOrder={this.props.sort.order}>
                            {this.getProducts().map((product, index) =>
                                <CartItem
                                    key={index}
                                    number={index + 1}
                                    product={product}
                                    onIncrement={() => this.updateProductQuantity(product.id, QUANTITY_TYPES_CART.INCREMENT)}
                                    onDecrement={() => this.updateProductQuantity(product.id, QUANTITY_TYPES_CART.DECREMENT)}
                                    onRemove={() => this.removeProduct(product.id)}
                                />
                            )}
                        </CartList>
                    </div>
                </div>
            </div>
        )
    }
}

// TODO: прописать propTypes
//Cart.propTypes = {}

/**
 * Prepare cart state
 * @function filterState
 * @returns {Object} Cart state
 */
const filterState = (state) => {
    return {
        products: getCartProducts(state),
        countProductsInShop: state.products.length,
        sort: state.cart.sort
    }
}

export default connect(filterState)(Cart);
