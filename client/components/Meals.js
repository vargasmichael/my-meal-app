import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Editmealform from './Editmealform';
import { useNavigation } from '@react-navigation/native';
import { set } from 'react-native-reanimated';



function handleFetch() {
  return fetch('api/meals')
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      return data;
    });
}

function handleUserFetch() {
  return fetch(`api/users`)
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
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
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  // console.log(user);
  // console.log(setUser)

  useEffect(() => {
    handleFetch().then(data => {
      setDishes(data);
    });
  }, []);

  useEffect(() => {
    handleUserFetch().then(data => {
      setUser(data);
      handlesession();
      // console.log(data);
    });
  }, [])

  function handlesession() {
    fetch('/api/checksession')
    .then(response => response.json())
    .then(currentUser => {
        // console.log('current User', currentUser);
        setCurrentUser(currentUser);
    })
  }

  

  function handleAddToMealPlan(dish) {
    handlesession();
    // console.log(dish);
    const mealPlanData = {
      // user_id: user.id,
      meal_id: dish.id,
      user_id: currentUser.id,
      
       
    };
  
    fetch(`/api/meals/${dish.id}`, {
      method: 'GET',
     })
    .then(response => response.json())
    .then(resource => {
      // console.log(resource);
      // console.log(mealPlanData)
      fetch(`/api/meal_plan/${currentUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlanData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        return data;
      })
    }
      
    )
    
    
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
  setEditMeal(dish.id);
}

function handleSaveChanges(newDish) {
  const updatedDishes = dishes.map((dish) => 
    dish?.id === newDish.id ? newDish : dish
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
        
        } else {
        console.log('Failed to delete meal.');
        }
    });
    }





  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {currentUser.username} here are you meals!</Text>
      {/* <Button color="#f4511e" style={styles.button} title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
      <Button color="#f4511e" style={styles.button} title="Go back" onPress={() => props.navigation.goBack()} />
      <Button color="#f4511e" style={styles.button} title="Get Meals" onPress={handleFetch} />
      <Button color="#f4511e" style={styles.button} title="Go To Meal Plan" onPress={() => props.navigation.navigate('Mealplan')} /> */}
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
            {editMeal ===dish.id && (
        <Editmealform dish={selectedMeal} onSaveChanges={handleSaveChanges} onDelete={handleDelete}  />
      )}
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{dish.name}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>{dish.description}</Text>
            <Text style={{ fontSize: 12, color: '#999' }}>{dish.category}</Text>
            <View style={styles.buttonContainer}>
            <Button  color="#daa520" style={styles.button} title="Add to Meal Plan" onPress={() => handleAddToMealPlan(dish)} onPressIn={() => handlesession()
            }/>
            <Button  color="#daa520" style={styles.button} title="Edit Meal" onPress={() => handleEditMeal(dish)} />
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("https://wallpapers.com/images/high/green-gradient-color-background-cm7l1ky0cdimtvjw.webp")',
    backgroundSize: 'cover',
    backgroundColor: '#00bfff',
  },
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
  text: {
    color: `#black`,
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#daa520',
  },
});



export default Meals;
