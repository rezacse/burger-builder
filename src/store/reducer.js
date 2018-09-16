
import * as actionTypes from './actions';
import INGREDIENT_PRICES from '../constants/appConstants';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4
};

const reducer = (state = initialState, action)=> {
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };  
        default:
            return state
    }
};

export default reducer;




// updatedPrice = (type, isMore) => {
//     const ingredientPrice = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     return isMore ? oldPrice + ingredientPrice : oldPrice - ingredientPrice;
// }

// addIngredientHandler = (type) => {
//     const newPrice = this.updatedPrice(type, true);
//     const updatedIngredients = this.updatedIngredients(type, true);
//     this.setState({ 
//         totalPrice: newPrice, 
//         ingredients: updatedIngredients
//     });
//     this.updatePurchaseState(updatedIngredients);
// } 

// removeIngredientHandler = (type) => {
//     const updatedIngredients = this.updatedIngredients(type, false);
//     if (updatedIngredients) {
//         const newPrice = this.updatedPrice(type, false)
//         this.setState({ 
//             totalPrice: newPrice, 
//             ingredients: updatedIngredients
//         });
//         this.updatePurchaseState(updatedIngredients);
//     } 
// } 