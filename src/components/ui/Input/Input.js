import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(!props.isValid && props.isTouched) inputClasses.push(classes.Invalid);
    switch(props.elementType)
    {
        case 'input':
            inputElement = <input 
                className={inputClasses.join(' ')}
                value={props.value} 
                {...props.elementConfig}
                onChange={props.changed} />;
            break;
        case 'texarea': 
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                value={props.value}
                {...props.elementConfig} 
                onChange={props.changed}/>
            break;    
        case 'select': 
            inputElement = <select 
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(op=> (
                            <option key={op.value} value={op.value}>
                                {op.displayValue}
                            </option>
                        ))}
                </select>            
            break;
        default:
            inputElement = null;
        break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;