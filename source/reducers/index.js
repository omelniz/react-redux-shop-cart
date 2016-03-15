import { combineReducers } from 'redux'
import { cartReducer as cart } from './cart'
import { productReducer as products } from './products'

export default combineReducers({
  cart,
  products
})
