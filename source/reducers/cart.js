import {Map, Set} from 'immutable';
import {SORT_DEFAULT_KEY, SORT_ORDER} from '../constants/sort'
import {saveState, getSavedState} from './../actions/storage'
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SORT_CART,
    UPDATE_QUANTITY_CART,
    QUANTITY_TYPES_CART
} from '../constants/actions'

const defaultState = {
    sort: {
        key: SORT_DEFAULT_KEY,
        order: SORT_ORDER.ASC
    },
    itemsIds: [],
    quantityById: {}
};
const initialState = getSavedState() || defaultState;

/**
 * Subreducer for itemsIds
 * @function itemsIds
 * @param {Array} state
 * @param {Object} action
 * @returns {Array} itemsIds
 */
function itemsIds(state, action) {
    state = Set(state);

    switch (action.type) {
        case ADD_TO_CART:
            state = state.add(action.productId);
            break;
        case REMOVE_FROM_CART:
            state = state.delete(action.productId);
            break;
        default:
            state = state;
    }

    return state.toJS();
}

/**
 * Subreducer for quantityById
 * @function quantityById
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} quantityById
 */
function quantityById(state, action) {
    state = Map(state);

    switch (action.type) {
        case ADD_TO_CART:
            state = state.update(String(action.productId), 0, quantity => quantity + 1);
            break;
        case REMOVE_FROM_CART:
            state = state.delete(String(action.productId));
            break;
        case UPDATE_QUANTITY_CART:
            state = state.update(String(action.productId), 0, quantity => {
                const MINIMAL_QUANTITY = 1;

                switch (action.direction) {
                    case QUANTITY_TYPES_CART.INCREMENT:
                        return quantity + 1;
                    case QUANTITY_TYPES_CART.DECREMENT:
                        return quantity > MINIMAL_QUANTITY ? quantity - 1 : MINIMAL_QUANTITY;
                    default:
                        return quantity;
                }
            })
            break;
        default:
            state = state;
    }

    return state.toJS();
}

/**
 * Subreducer for sort
 * @function sort
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} sort parameters
 */
function sort(state, action) {
    switch (action.type) {
        case SORT_CART:
            let {key, order} = action;
            return {key, order}
        default:
            return state;
    }
}

/**
 * Cart Reducer
 * @function cartReducer
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} cart state
 */
export function cartReducer(state = initialState, action) {
    let newState;

    if (action.type === CLEAR_CART) {
        newState = defaultState;
    }
    else {
        newState = {
            sort: sort(state.sort, action),
            itemsIds: itemsIds(state.itemsIds, action),
            quantityById: quantityById(state.quantityById, action)
        };
    }

    saveState(newState);

    return newState;
}
