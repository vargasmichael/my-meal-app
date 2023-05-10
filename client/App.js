import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './components/TabNavigator';



// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

// import Animated, { interpolate } from 'react-native-reanimated';
// import { FormField  } from "@formfield/react";

import Login from './components/Login';
import Signup from './components/Signup';
import Mealplan from './components/Mealplan';
import Meals from './components/Meals';
import Mealform from './components/Mealform';
import Checksession from './components/Checksession';
import Editmealform from './components/Editmealform';
import HomeScreen from './components/Homescreen';
import Header from './components/Header';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setU] = useState(null);
  
  
  function handleLogout(props) {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      console.log("User logged out");
      setLoggedIn
    })
  };
  
  
  const Stack = createNativeStackNavigator();
  

  return (

  




    <NavigationContainer>
      <Stack.Navigator initialRouteName='Mealplan'>
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: "My Home", headerStyle: {
          backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
            fontWeight: 'bold'},
            headerRight: () => (
              <Button
                onPress={() => {handleLogout()}}
                title="Logout"
                color="#0000"
              />
            )
          
          }}>
          </Stack.Screen>
        <Stack.Screen name="Login"  options={{ title: "Login", headerStyle: {
          backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
        
        >
        {props=>{return <Login setU={setU} user={user} {...props}/>}}</Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} options={{ title: "Signup", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
      }} />
        <Stack.Screen name="Mealplan" component={Mealplan} options={{ title: "Mealplan", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}/>
        <Stack.Screen name="Meals" component={Meals} options={{ title: "Meals", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}/>
        <Stack.Screen name="Mealform" component={Mealform} options={{ title: "Mealform", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}/>
        <Stack.Screen name="Checksession" component={Checksession} options={{ title: "Checksession", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
        }}/>
        <Stack.Screen name="Editmealform" component={Editmealform} options={{ title: "Editmealform", headerStyle: {
        backgroundColor: '#f4511e',} , headerTintColor: '#fff', headerTitleStyle: {
          fontWeight: 'bold',
        }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    color: '#f4511e',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default App;


// still to do
// set users to a mealplan so when you search for meals it only shows your mealplan
// make it so no one can log in while someone is logged in
// make the edit meals form look better and have the cancel button work
// try to get a header that persists on all pages, with a hambuger button that opens a drawer