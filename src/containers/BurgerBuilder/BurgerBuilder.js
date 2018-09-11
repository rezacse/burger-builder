import React, { Component } from 'react';

import INGREDIENT_PRICES from '../../constants/appConstants';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,        
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('https://my-burger-builder-545bd.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
          this.setState({error: true});
        });
    }

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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'shamim',
                address: {
                    street: 'Dhaka Uddan',
                    zipCode: '1207',
                    country: 'Bangladesh'
                },
                deliveryMethod: 'fastest'
            }
        };

        this.setState({loading: true});

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            });
    }

    getOrderSummaryElement() {
        let orderSummary;
        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        } else if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return orderSummary;
    }

    getBurgerElement() {
        let burger;
        if (this.state.ingredients) {
            const disabledInfo = { ...this.state.ingredients };
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        totalPrice={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved= {this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchasable={ this.state.purchasable} 
                        ordered = {this.purchaseHandler} />
                </Aux>);
        } else {
            burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        }
        return burger;
    }

    render() {
                
        let orderSummary = this.getOrderSummaryElement();
         
        let burger = this.getBurgerElement();        

        return (
            <Aux>
                <Modal isShow={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>    
        )
    }
}

export default errorHandler(BurgerBuilder, axios);