import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './login/login';
import Tabs from './tabs';
import Createlogin from './login/Createlogin';
import Createuser from './login/Createuser';
import {navigationRef} from './navigationRef';
// import { navigationRef } from './RootNavigation';
const Stack = createStackNavigator();
const Tabsnavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Createlogin" component={Createlogin} />
        <Stack.Screen name="Createuser" component={Createuser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Tabsnavigation;
