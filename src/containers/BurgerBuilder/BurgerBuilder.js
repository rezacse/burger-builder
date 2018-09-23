import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {      
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatedIngredients = (type, isMore) => {
        const oldCount = this.props.storeIngredients[type];
        let updatedCount = oldCount
        if (isMore) {
            updatedCount += 1;
        } else {
            if (oldCount <= 0) return;
            updatedCount -= 1;
        }
        const updatedIngredients = { ...this.props.storeIngredients};
        updatedIngredients[type] = updatedCount;

        return updatedIngredients;
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum, el) => sum + el, 0);

        return sum > 0;        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
        //#region passThroughUrl
        // let queryParams = [];
        // for(let ingredient in this.props.storeIngredients) {
        //     queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.storeIngredients[ingredient]));
        // }
        // queryParams.push('price='+ this.props.totalPrice);
        // let queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString            
        // });
        //#endregion
    }

    getOrderSummaryElement() {
        let orderSummary;
        if (this.props.storeIngredients) {
            orderSummary = <OrderSummary 
                ingredients={this.props.storeIngredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        } else if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return orderSummary;
    }

    getBurgerElement() {
        let burger;
        if (this.props.storeIngredients) {
            const disabledInfo = { ...this.props.storeIngredients };
            for(let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.props.storeIngredients}/>
                    <BuildControls 
                        totalPrice={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved= {this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        purchasable={ this.updatePurchaseState(this.props.storeIngredients)} 
                        ordered = {this.purchaseHandler} />
                </Aux>);
        } else {
            burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
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

const mapStateToProps = (state) => {
    return {
        storeIngredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.isError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));