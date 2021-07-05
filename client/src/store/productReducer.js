const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'updateProducts':
            return {
                ...state,
                products: [...action.products]
            };
    }
}