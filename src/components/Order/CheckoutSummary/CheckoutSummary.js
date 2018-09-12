import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../ui/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3>We hope it tastes well!</h3>
            <div className={classes.BurgerContainer}>
                <Burger ingredients={props.ingredients} />
            </div>

            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled} >CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued} >CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;