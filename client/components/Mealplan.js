import React from 'react';
import { useState, useEffect } from 'react';
import { View, Input, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

function handleFetch() {
  return fetch(`/api/meal_plan/${user.id}`)
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      return data;
  })
}

function Mealplan (props) {
    const [mealplan, setMealplan] = useState([]);

    useEffect(() => {
        handleFetch().then(data => {
            setMealplan(data);
        });
    }, [])
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text}>Meal Plan</Text>
        <Button color="#f4511e" style={styles.button} title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
        <Button color="#f4511e" style={styles.button} title="Go back" onPress={() => props.navigation.goBack()} />
        <Button color="#f4511e" style={styles.button} title="Get Meal Plan" onPress={handleFetch} />
        {mealplan && mealplan.map(mealplan => (
            <Text key={mealplan.id}>{mealplan.day_of_week}{mealplan.meal_time}</Text>
        ))}
      </View>
    );
  }
  const styles = StyleSheet.create({
    button: {
      
      borderRadius: 15,
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
    form: {
      height: 40,
      borderColor: "black",
      borderWidth: 5,
      width: 200,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    text: {
      color: '#f4511e',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default Mealplan;
