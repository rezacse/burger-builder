import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/ui/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                isTouched: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                isValid: false,
                isTouched: false
            },
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: this.getDeliveryMethods()
                },
                value: 'fastest',
                isValid: true,
                isTouched: false
            }
        },
        isFormValid: false,
        loading: false
    }

    getDeliveryMethods() {
        return [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
        ];
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim().length > 0;
        }

        if (isValid && rules.minLength) isValid = value.length >= rules.minLength ;

        if (isValid && rules.maxLength) isValid = value.length <= rules.maxLength ;

        return isValid;
    }

    isSubmitFormValid(form) {
        for(let key in form) {
            if(form[key].validation && !form[key].isValid) return false;
        }
        return true;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderElement = {...updatedOrderForm[inputIdentifier]};
        updatedOrderElement.value = event.target.value;
        if(updatedOrderElement.validation) {
            updatedOrderElement.isTouched = true;
            updatedOrderElement.isValid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        }
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        const updatedIsFormValid = this.isSubmitFormValid(updatedOrderForm);
        this.setState({orderForm: updatedOrderForm, isFormValid: updatedIsFormValid});
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const customerInfo = {};
        for(let key in this.state.orderForm) {
            customerInfo[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.storeIngredients,
            price: this.props.totalPrice,
            customer: customerInfo
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            });
    }

    render () {
        let formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => {
                    return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        isValid={formElement.config.isValid}
                        isTouched={formElement.config.isTouched}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)} />
                })}
                <Button 
                    btnType="Success" 
                    disabled={!this.state.isFormValid}
                    clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
      
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        storeIngredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);