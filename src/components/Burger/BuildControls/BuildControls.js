import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildContols = (props) => {
    const controls = [
        { label: 'Bacon', type: 'bacon'},
        { label: 'Cheese', type: 'cheese'},
        { label: 'Salad', type: 'salad'},
        { label: 'Meat', type: 'meat'}
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            { controls.map(ctrl => {
                return <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label} 
                            added={ () => props.ingredientAdded(ctrl.type) }
                            removed={ () => props.ingredientRemoved(ctrl.type) } 
                            disabled = { props.disabled[ctrl.type] } />;

            }) }
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default buildContols;