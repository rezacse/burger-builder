import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    //#region getThroughURL
    // componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for(let param of query.entries()) {
        //     if(param[0]==='price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }
        //this.setState({ingredients: ingredients, totalPrice: price});        
    // }
    //#endregion

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;        
        if(this.props.storeIngredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;  
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.storeIngredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                    {/* render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}  */}
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        storeIngredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};




export default connect(mapStateToProps)(Checkout);