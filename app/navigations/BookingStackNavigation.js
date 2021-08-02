import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListBookingScreen from '../components/listbooking/screen/ListBookingScreen';
import CommentScreen from '../components/listbooking/screen/CommentScreen';

const Stack = createStackNavigator();
export default function BookingStackNavigation() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="ListBooking" component={ListBookingScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
    </Stack.Navigator>
  );
}
