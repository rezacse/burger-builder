import React, { Component } from 'react';

import Aux from '../Auxi/Auxi';
import Modal from '../../components/ui/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        clearErrorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal isShow={this.state.error}
                           modalClosed={this.clearErrorHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default errorHandler;