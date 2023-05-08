import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Picker } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


function EditableMealForm(props) {
  const [name, setName] = useState(props.dish.name);
  const [description, setDescription] = useState(props.dish.description);
  const [category, setCategory] = useState(props.dish.category);
  const [dishes, setDishes] = useState([props.dish]);
  const [selectedMeal, setSelectedMeal] = useState(props.dish); // Add a default value here to avoid errors when calling selectedMeal.id
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [editMeal, setEditMeal] = useState(false);

  const navigation = useNavigation();
  


  function handleSaveChanges() {
    const updatedDish = {
      ...props.dish,
      name: name,
      description: description,
      category: category,
    };
    props.onSaveChanges(updatedDish);
  }

  function handleDelete() {
    props.onDelete();
  }
  

//   With this change, updatedDishes will be an empty array if props.dishes is null or undefined, avoiding the error when calling the filter method.
      
    
      
      
      
 
      
  
 
return (
    <View>
      <Text>Edit Meal</Text>
      <TextInput style={styles.formName} value={name} onChangeText={setName} />
      <TextInput style={styles.formDescription} value={description} onChangeText={setDescription} />
      <Picker
        style={styles.formCategory} 
        selectedValue={category}
        onValueChange={value => setCategory(value)}
      >
        <Picker.Item label="Select Category..." value="" />
        <Picker.Item label="Breakfast" value="Breakfast" />
        <Picker.Item label="Lunch" value="Lunch" />
        <Picker.Item label="Dinner" value="Dinner" />
        <Picker.Item label="Snack" value="Snack" />
      </Picker>
      <View style={styles.buttonContainer}>
      <Button color="#f4511e" style={styles.button} title="Save Changes" onPress={handleSaveChanges} />
      <Button color="#f4511e" style={styles.button} title="Delete" onPress={handleDelete} />
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    button: {
      borderRadius: 15,
      padding: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      width: 200,
    },
    formName: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        width: 400,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    formDescription: {
        height: 100,
        borderColor: "black",
        borderWidth: 1,
        width: 500,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
     

    },
    formCategory: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        width: 400,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
  });
  

export default EditableMealForm;