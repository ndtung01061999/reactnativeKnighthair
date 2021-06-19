import 'react-native-gesture-handler';
import React from 'react';
import Tabsnavigation from './app/navigations/Tabsnavigation';
import { Provider } from 'react-redux';
import store from './app/redux/StoreRedux';
export default function App() {
  return (
    <Provider store={store}>
      <Tabsnavigation></Tabsnavigation>
    </Provider>
  )
}