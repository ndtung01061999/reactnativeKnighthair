import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import HomeStackNavigation from './HomeStackNavitgation';
import BookingStackNavigation from './BookingStackNavigation';
import UserStackNavigation from './UserStackNavigation';
const Tab = createBottomTabNavigator();
export default function Tabs() {
  return (
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          labelStyle: {
            fontSize: 12,
          },
          activeTintColor: '#FC6011',
          inactiveTintColor: '#4A4B4D',
        }}>
        <Tab.Screen
          name="home"
          component={HomeStackNavigation}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color}) => (
              <Icon name="home" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="booking"
          component={BookingStackNavigation}
          options={{
            tabBarLabel: 'Lịch đặt',
            tabBarIcon: ({color}) => (
              <Ionicons name="calendar" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="user"
          component={UserStackNavigation}
          options={{
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({color}) => (
              <Icon name="user" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // tabbottom: {
  //   marginBottom: 27,
  // },
});
