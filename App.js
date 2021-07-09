import 'react-native-gesture-handler';
import React from 'react';
import Tabsnavigation from './app/navigations/Tabsnavigation';
import {Provider} from 'react-redux';
import reduxStore from './app/redux/config/reduxStore';
export default function App() {
  return (
    <Provider store={reduxStore.store}>
      <Tabsnavigation />
    </Provider>
  );
}
