import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FcHome } from "react-icons/fc";
import Login from './Login';
import Signup from './Signup';
import Meals from './Meals';
import Mealplan from './Mealplan';
import Mealform from './Mealform';
import Checksession from './Checksession';
import Editmealform from './Editmealform';
import HomeScreen from './Homescreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    
    <Tab.Navigator>
        <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
            tabBarIcon: ({ color, size }) => (
                <FcHome color={color} size={size} />
            ),
        }}
    />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Signup" component={Signup} />
        <Tab.Screen name="Meals" component={Meals} />
        <Tab.Screen name="Mealplan" component={Mealplan} />
        

    </Tab.Navigator>
    )
}

export default TabNavigator;
