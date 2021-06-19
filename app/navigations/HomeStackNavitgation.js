import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListStoreScreen from '../components/home/Screen/ListStoreScreen';
import HomeScreen from '../components/home/Screen/HomeScreen';
import DetailStoreScreen from '../components/home/Screen/detailStoreSreen/DetailStoreScreen';
import BookingScreen from '../components/home/Screen/bookingScreen/BookingScreen'
const Stack = createStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="ListStoreScreen" component={ListStoreScreen} />
      <Stack.Screen name="DetailStoreScreen" component={DetailStoreScreen}/>
      <Stack.Screen name="BookingScreen" component={BookingScreen}/>
    </Stack.Navigator>
  );
};


export default HomeStackNavigation;