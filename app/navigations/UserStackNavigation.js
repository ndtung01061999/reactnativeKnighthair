import React from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../components/user/screen/UserScreen';
import CreateUserScreen from '../components/user/screen/CreateUserScreen';
import UpdatepassScreen from '../components/user/screen/UpdatepassScreen';
const Stack = createStackNavigator();
export default function UserStackNavigation(){
    return(
        <Stack.Navigator headerMode={'none'}>
             <Stack.Screen name="UserScreen" component={UserScreen} />
             <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
             <Stack.Screen name="UpdatepassScreen" component={UpdatepassScreen} />
             {/* <Stack.Screen name="Login" component={LoginScreen}/> */}
        </Stack.Navigator>
    )
}