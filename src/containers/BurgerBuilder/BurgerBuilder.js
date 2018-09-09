import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import INGREDIENT_PRICES from '../../constants/appConstants';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },        
        totalPrice: 4,
        purchasable: false
    };

    updatedIngredients = (type, isMore) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount
        if (isMore) {
            updatedCount += 1;
        } else {
            if (oldCount <= 0) return;
            updatedCount -= 1;
        }
        const updatedIngredients = { ...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        return updatedIngredients;
    }

    updatedPrice = (type, isMore) => {
        const ingredientPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        return isMore ? oldPrice + ingredientPrice : oldPrice - ingredientPrice;
    }

    addIngredientHandler = (type) => {
        const newPrice = this.updatedPrice(type, true);
        const updatedIngredients = this.updatedIngredients(type, true);
        this.setState({ 
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    } 

    removeIngredientHandler = (type) => {
        const updatedIngredients = this.updatedIngredients(type, false);
        if (updatedIngredients) {
            const newPrice = this.updatedPrice(type, false)
            this.setState({ 
                totalPrice: newPrice, 
                ingredients: updatedIngredients
            });
            this.updatePurchaseState(updatedIngredients);
        } 
    } 

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum, el)=> sum + el, 0);
        this.setState({purchasable: sum> 0});        
    }


    render() {
        const disabledInfo = { ...this.state.ingredients };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    purchasable={ this.state.purchasable} />
            </Aux>    
        )
    }
}

export default BurgerBuilder;