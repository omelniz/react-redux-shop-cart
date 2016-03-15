import React, { Component, PropTypes } from 'react'
import {SORT_ORDER} from '../constants/sort'

/**
 * Invert sort order
 * @function invertSortOrder
 * @param {string} order
 * @returns {string} Inverted order
 * @see SORT_ORDER in constants/sort.js
 */
function invertSortOrder(sortOrder) {
    switch (sortOrder) {
        case SORT_ORDER.ASC:
            return SORT_ORDER.DESC;
        case SORT_ORDER.DESC:
            return SORT_ORDER.ASC;
        default:
            return sortOrder;
    }
}

/**
 * SortIcon Component
 * @function SortIcon
 */
const SortIcon = ({ sortOrder }) => {
    const classBySortOrder = {
        [SORT_ORDER.ASC]: "glyphicon glyphicon-chevron-up",
        [SORT_ORDER.DESC]: "glyphicon glyphicon-chevron-down"
    }

    /**
     * Render component
     * @function render
     * @returns {Function}
     */
    return (
        <span className={classBySortOrder[sortOrder]}></span>
    )
}

/**
 * CartItem Component
 * @class Cart <React.Component>
 */
export default class CartList extends Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th onClick={() => this.props.onSort(this.props.sortKey, invertSortOrder(this.props.sortOrder))}>
                            Name <SortIcon sortOrder={this.props.sortOrder} />
                        </th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}

// TODO: прописать propTypes
//CartList.propTypes = {}
