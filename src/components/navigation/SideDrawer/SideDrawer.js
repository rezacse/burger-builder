import React from 'react';

import Logo from '../../ui/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi/Auxi';

const sideDrawer = (props) => {

    let attachedClasses = props.open 
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];
    
    return (
        <Aux>
            <Backdrop isShow={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>            
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;