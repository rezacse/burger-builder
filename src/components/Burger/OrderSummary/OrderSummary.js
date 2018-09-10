
import React from 'react'
import Aux from '../../../hoc/Auxi/Auxi';
import classes from '../../../assets/css/common.css';
import Button from '../../ui/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
    .map(igKey => {
        return (
            <li key={igKey}>
                <span className={classes.capitalize}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        );
    });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;