/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import rootReducers from './src/reducers/rootReducers.js';
import AppNavigatorWithState from './src/navigator/AppNavigator.js';



const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
  ));

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigatorWithState/>
      </Provider>
    );
  }
}
