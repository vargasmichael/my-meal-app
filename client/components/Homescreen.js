import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Login from './Login';
import Signup from './Signup';
import Meals from './Meals';
import Mealplan from './Mealplan';
import Mealform from './Mealform';
import Checksession from './Checksession';
import Editmealform from './Editmealform';





function HomeScreen({ navigation }) {

    const Tab = createBottomTabNavigator();
  
  return (
  
    
  
  
        <View style={styles.container}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <View style={styles.buttonContainer}>
          <Button color='#daa520' style={styles.button} title="Login here!" onPress={() => {navigation.navigate('Login')}}/>
          <Button color='#daa520' style={styles.button} title="Sign Up here!" onPress={() => {navigation.navigate('Signup')}}/>
          {/* <Button color="#f4511e" style={styles.button} title="Your Meal Plan!" onPress={() => {navigation.navigate('Mealplan')}}/>
          <Button color="#f4511e" style={styles.button} title="Your Meals!" onPress={() => {navigation.navigate('Meals')}}/>
          <Button color="#f4511e" style={styles.button} title="Enter a New Meal!" onPress={() => {navigation.navigate('Mealform')}}/>
          <Button color="#f4511e" style={styles.button} title="Check Session!" onPress={() => {navigation.navigate('Checksession')}}/> */}
        </View>
        </View>
        
      
      
    );
  
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f2f2f2', 
      backgroundImage: 'url("https://wallpapers.com/images/high/green-gradient-color-background-cm7l1ky0cdimtvjw.webp")',
      backgroundSize: 'cover',
    },
    logo: {
      width: 550, // Adjust the width to your preference
      height: 500, // Adjust the height to your preference
      marginBottom: 20,
      borderRadius: 15,
    },
    button: {
      color: '#f4511e',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      width: 200,
    },
    title: {
      color: 'purple',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  export default HomeScreen;