import { createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const preloadedState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

const store = createStore(rootReducer, preloadedState);

export default store;