const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
}

export default function categoryReducer (state = initialState, action) {
    switch (action.type) {
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
    }
};