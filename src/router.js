import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import {
    Home,
    NotFound
} from './routes';
import ErrorBoundary from "./helpers/ErrorBoundary";
import { setConfig } from 'react-hot-loader';
import { hot } from "react-hot-loader/root";
import { getEnv } from '@babel/core/lib/config/helpers/environment';
import ScrollToTop from "./ScrollToTop";

if (getEnv() === 'production')
    setConfig({
        reloadHooks: false
    });

const store = configureStore();

const Router = () => <Provider store={ store }>
    <ConnectedRouter history={ history }>
        <ErrorBoundary>
            <ScrollToTop />
            <Switch>
                <Route exact path={ '/' } render={ Home } />
                <Route component={ NotFound } />
            </Switch>
        </ErrorBoundary>
    </ConnectedRouter>
</Provider>;

export default getEnv() === 'production' ? Router : hot(Router);
