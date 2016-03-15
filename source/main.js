import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import CartApp from './components/Cart'
import {fetchProducts} from './actions/products'

let logger = createLogger();
let middlewaries = [thunk, logger];
let store = createStore(reducer, applyMiddleware(...middlewaries));

store.dispatch(fetchProducts());

render(
    <Provider store={store}>
        <CartApp />
    </Provider>,
    document.getElementById('app')
);
