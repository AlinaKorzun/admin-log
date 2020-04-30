import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

export default function configureStore(preloadedState: any) {
    const store = createStore(
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );

    return store;
}
