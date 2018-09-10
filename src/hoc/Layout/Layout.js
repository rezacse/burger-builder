import React, { Component } from 'react';

import classes from './Layout.css';
import Aux from '../Auxi/Auxi';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state = {
        isSideDrawerVisible: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({isSideDrawerVisible: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { isSideDrawerVisible: !prevState.isSideDrawerVisible };
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar 
                    drawerToggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.isSideDrawerVisible}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }    
};

export default Layout;