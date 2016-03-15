import React, { Component, PropTypes } from 'react'

/**
 * CartItem Component
 * @class Cart <React.Component>
 */
export default class CartItem extends Component {
    /**
     * Render component
     * @function render
     * @returns {Function}
     */
    render() {
        const {product, number} = this.props;

        return (
            <tr>
                <td>{ number }</td>
                <td><img width="40" src={ product.photo } /></td>
                <td>{ product.name }</td>
                <td>{ product.price }$</td>
                <td>
                    <button className="btn btn-link" type="button" onClick={this.props.onDecrement}>
                        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                    </button>
                    <span> { product.quantity } </span>
                    <button className="btn btn-link" type="button" onClick={this.props.onIncrement}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </td>
                <td>{ product.price * product.quantity }$</td>
                <td>
                    <button className="btn btn-link" type="button" onClick={this.props.onRemove}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove
                    </button>
                </td>
            </tr>
        )
    }
}

// TODO: прописать propTypes
//CartItem.propTypes = {}
