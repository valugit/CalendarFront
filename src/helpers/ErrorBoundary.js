import React from 'react';
import { getEnv } from '@babel/core/lib/config/helpers/environment';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: getEnv() === 'test' ? undefined : false };
    }

    componentDidMount() {
        if (typeof (this.state.error) === 'undefined' && Boolean(this.props.error))
            this.setState({ hasError: this.props.error })
    }

    static getDerivedStateFromError = () => ({ hasError: true });

    componentDidCatch(error, info) {
        getEnv() === 'production' ? null : console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div id={ 'error' } className={ 'b-light-background c-dark-blue' }>
                <h1>500</h1>
                <p>Something's not quite right... But not from you ? Maybe the server encountered a problem...</p>
            </div>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;