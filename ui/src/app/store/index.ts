// Redux Store Configuration
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import loggingMiddleware from './middleware/logging';

export default class ReduxStore {
  /**
   * Configures a new store for the application.
   *
   * @param initialState The desired initial state
   */
  public static configureStore(initialState?: any) {
    const middleware = applyMiddleware(thunk, loggingMiddleware);
    return createStore(rootReducer, initialState, composeWithDevTools(middleware));
  }
}
