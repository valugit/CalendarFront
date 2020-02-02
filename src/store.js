import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { createBrowserHistory } from "history";
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
    createStore(
        reducers(history),
        composeEnhancer(applyMiddleware(...middleware))
    );

export default configureStore;