import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import PrivateRoute from './helpers/PrivateRouter';
import {
    Home,
    Booking,
    GameMasterProfile,
    Login,
    Register,
    NotFound
} from './routes';
import ErrorBoundary from "./helpers/ErrorBoundary";
import { hot } from "react-hot-loader/root";
import { getEnv } from '@babel/core/lib/config/helpers/environment';
import ScrollToTop from "./ScrollToTop";

const store = configureStore();

const Router = () => <Provider store={ store }>
    <ConnectedRouter history={ history }>
        <ErrorBoundary>
            <ScrollToTop />
            <Switch>
                <Route exact path={ '/login' } render={ Login } />
                <Route exact path={ '/register' } render={ Register } />
                <PrivateRoute exact path={ '/' } component={ Home } />
                <PrivateRoute exact path={ '/booking' } component={ Booking } />
                <PrivateRoute path={ '/:id' } component={ GameMasterProfile } />
                <Route component={ NotFound } />
            </Switch>
        </ErrorBoundary>
    </ConnectedRouter>
</Provider>;

export default getEnv() === 'production' ? Router : hot(Router);
