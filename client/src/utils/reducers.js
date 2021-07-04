const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        // if action type is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case 'updateProducts':
            return {
                ...state,
                products: [...action.products]
            };
        case 'updateCategories':
            return {
                ...state,
                categories: [...action.categories]
            };
        case 'updateCurrentCategory':
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case 'addToCart':
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        case 'addMultipleToCart':
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            };
        case 'removeFromCart':
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            }
        case 'updateCartQuantity':
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            }
        case 'clearCart':
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case 'toggleCart':
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        // if its none of these actions, do not update state and keep things same
        default:
            return state;
    }
};