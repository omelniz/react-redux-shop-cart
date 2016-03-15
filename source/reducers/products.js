import { RECEIVE_PRODUCTS } from '../constants/actions'

export function productReducer(state = [], action) {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return [...action.products];
        default:
            return state;
    }
    return state;
}
