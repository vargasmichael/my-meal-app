import React from 'react';
import { useState } from 'react';
import { View, TextInput, Picker, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';

// import Form from 'react-native-form';

function Mealform (props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const categories = ["Breakfast", "Lunch", "Dinner", "Snack"]

    function handleSubmit () {
       fetch('/api/meals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, category })
        }) 
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            props.navigation.navigate('Meals');
        })

    }

    return (
          <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Image source={require('../assets/icon2.png')} style={styles.logo} />
              <Text style={styles.text}>Enter a Meal</Text>
              <TextInput
                style={styles.form}
                autoCapitalize="none"
                autoCompleteType="Meal Name"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Meal Name"
              />
              <TextInput
                style={styles.formDescription}
                autoCapitalize="none"
                autoCompleteType="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Description"
              />
              <Picker
                style={styles.form}
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                >
                <Picker.Item label="Select Category" value="" />
                {categories.map((item, index) => {
                    return <Picker.Item label={item} value={item} key={index} />;
                })}
                </Picker>
                <View style={styles.buttonContainer}>
              <Button color="#daa520" style={styles.button} title="Enter" onPress={handleSubmit}/>
              <Button color="#daa520" style={styles.button} title="Meal Plan" onPress={() => props.navigation.push('Mealplan')}/>
            </View>
          </View>
          </View>
          );
          
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://wallpapers.com/images/high/green-gradient-color-background-cm7l1ky0cdimtvjw.webp")',
        backgroundSize: 'cover',
      },
      button: {
        
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 200,
        
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
      },
      title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        
      },
      form: {
        height: 60,
        borderColor: "black",
        borderWidth: 5,
        width: 300,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#dcdcdc',
      },
      formDescription: {
        height: 200,
        borderColor: "black",
        borderWidth: 5,
        width: 300,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: "#dcdcdc",
        
      },
      text: {
        color: '#daa520',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        },
    });

  // need to figure out the wrap around for the form
    

export default Mealform;