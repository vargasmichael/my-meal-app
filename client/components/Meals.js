import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Editmealform from './Editmealform';
// import { useNavigation } from '@react-navigation/native';



function handleFetch() {
  return fetch('api/meals')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      return data;
    });
}

function Meals(props) {
  // const navigation = useNavigation();
  const [dishes, setDishes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  useEffect(() => {
    handleFetch().then(data => {
      setDishes(data);
    });
  }, []);

  
  function handleAddToMealPlan(dish) {
    const mealPlanData = {
      user_id: dish.user_id,
      meal_id: dish.meal_id,
      day_of_week: dish.day_of_week,
      meal_time: dish.meal_time
       
    };
  
    fetch(`/api/meal_plan/${dish.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealPlanData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Meal added to meal plan!');
      } else {
        console.log('Failed to add meal to meal plan.');
      }
    })
    .catch(error => {
      console.error('Error adding meal to meal plan:', error);
    });
  }

  function handleCategoryChange(value) {
    setSelectedCategory(value);
  }

  let filteredDishes = dishes;
  if (selectedCategory !== 'All') {
    filteredDishes = dishes.filter(dish => dish.category === selectedCategory);
  }
//  this is to edit the form
const [editMeal, setEditMeal] = useState(false);

function handleEditMeal(dish) {
  setSelectedMeal(dish);
  setEditMeal(true);
}

function handleSaveChanges(newDish) {
  const updatedDishes = dishes.map((dish) => 
    dish.id === newDish.id ? newDish : dish
  );
  setDishes(updatedDishes);

  setSelectedDishes([]);
  setEditMeal(false);

  const mealData = {
    name: newDish.name,
    description: newDish.description,
    category: newDish.category,
  };

  fetch(`/api/meals/${newDish.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mealData)
  })
  .then(response => {
    if (response.ok) {
      console.log('Meal updated!');
    } else {
      console.log('Failed to update meal.');
    }
  });
}

function handleDelete() {
    const updatedDishes = 
    dishes.filter((dish) => dish.id !== selectedMeal.id);
    
    setDishes(updatedDishes);
    setSelectedDishes([]);
    setEditMeal(false);
    
    fetch(`/api/meals/${selectedMeal.id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
        console.log('Meal deleted!');
        navigation.goBack();
        } else {
        console.log('Failed to delete meal.');
        }
    });
    }





  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Meals</Text>
      <Button color="#f4511e" style={styles.button} title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
      <Button color="#f4511e" style={styles.button} title="Go back" onPress={() => props.navigation.goBack()} />
      <Button color="#f4511e" style={styles.button} title="Get Meals" onPress={handleFetch} />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
        style={{ width: '25%', height: 50 }}
      >
        {categories.map(category => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <ScrollView style={{ maxHeight: '80%', marginTop: 20, paddingHorizontal: 10 }}>
        {filteredDishes.map(dish => (
          <View key={dish.id} style={{ 
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
            {editMeal && (
        <Editmealform dish={selectedMeal} onSaveChanges={handleSaveChanges} onDelete={handleDelete}  />
      )}
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{dish.name}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>{dish.description}</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>{dish.category}</Text>
            <View style={styles.buttonContainer}>
            <Button  color="#f4511e" style={styles.button} title="Add to Meal Plan" onPress={() => handleAddToMealPlan(dish)} />
            <Button  color="#f4511e" style={styles.button} title="Edit Meal" onPress={() => handleEditMeal(dish)} />
            </View>
          </View>
        ))}
     </ScrollView>
     <View style={{ paddingHorizontal: 10 }}>
       <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Selected Meals</Text>
       {selectedDishes.map(dish => (
         <View key={dish.id} style={{ 
           backgroundColor: '#fff',
           borderRadius: 8,
           padding: 10,
           marginBottom: 10,
           shadowColor: '#000',
           shadowOffset: {
             width: 0,
             height: 1,
           },
           shadowOpacity: 0.2,
           shadowRadius: 1.41,
           elevation: 2,
         }}>
           <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{dish.name}</Text>
           <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>{dish.description}</Text>
           <Text style={{ fontSize: 12, color: '#999' }}>{dish.category}</Text>
         </View>
       ))}
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
  }
});



export default Meals;
