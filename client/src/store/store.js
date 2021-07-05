import { createStore } from 'redux';
import rootReducer from './rootReducer';

const preloadedState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

const store = createStore(rootReducer, preloadedState);

export default store;