import React, { Component } from 'react';

import INGREDIENT_PRICES from '../../constants/appConstants';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },        
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('continue');
    }


    render() {
        const disabledInfo = { ...this.state.ingredients };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <Modal isShow={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                         />
                </Modal>
                <BuildControls 
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    purchasable={ this.state.purchasable} 
                    ordered = {this.purchaseHandler}
                    />
            </Aux>    
        )
    }
}

export default BurgerBuilder;