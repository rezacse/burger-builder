import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isShow !== this.props.isShow 
            || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop 
                    isShow={this.props.isShow} 
                    clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.isShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.isShow ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;