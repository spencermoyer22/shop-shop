const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
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
    }
}