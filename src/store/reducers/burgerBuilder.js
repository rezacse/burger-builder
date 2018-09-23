
import * as actionTypes from '../actions/actionTypes';
import INGREDIENT_PRICES from '../../constants/appConstants';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isError: false
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {                
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngdt = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngdnts = updateObject(state.ingredients, updatedIngdt);
    const updatedStt = {                
        ingredients: updatedIngdnts,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStt);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        isError: false
    }); 
}

const fetchIngredientsFailed = (state)=> {
    return  updateObject(state, {
        ingredients: null,
        isError: true
    }); 
}

const reducer = (state = initialState, action)=> {
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
             return fetchIngredientsFailed(state);
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