import React from 'react';
import { useState, useEffect } from 'react';

import { Text, Card, Button, Icon } from '@rneui/themed';
import { View, StyleSheet, Picker, ScrollView} from 'react-native';
import EditMealPlanForm from './Editmealplanform';


function Mealplan(props) {
  const [mealplan, setMealplan] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('Monday');
  const [selectedMealTime, setSelectedMealTime] = useState('Breakfast');


  useEffect(() => {
    handlesession();
  }, []);

  useEffect(() => {
    handleFetch(currentUser.id);
  }, [currentUser]);

  function handlesession() {
    fetch('/api/checksession')
      .then(response => response.json())
      .then(currentUser => {
        console.log('current User', currentUser);
        setCurrentUser(currentUser);
        if (currentUser) {
          handleFetch(currentUser.id);
        }
      })
      .catch(error => {
        console.log('Error checking session', error);
      });
  }
  function handleFetch(id) {
    const url = id ? `/api/meal_plan/${id}` : '/api/meal_plan';
    setLoading(true);
    return fetch(url)
      .then(response => response.json())
      .then(plan => {
        console.log(plan);
        setMealplan(plan);
      })
      .catch(error => {
        console.log('Error getting meal plan', error);
      })
      .finally(() => setLoading(false));
  }



  
  function MealplanCard({ mp }) {
    // console.log(mp)
    const [meal, setMeal] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);
    const categories = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [selectedPlan, setSelectedPlan] = useState(null);
    
    
    useEffect(() => {
      fetch(`/api/meals/${mp.meal_id}`)
      .then(response => response.json())
      .then(meal => {
        //  console.log('meal', meal);
        setMeal(meal);
      })
      .catch(error => {
        // console.log('Error getting meal', error);
      });
    }, [mp.meal_id]);
    
  // this is to edit the meal plan
  const [editPlan, setEditPlan] = useState(false);

  function handleEditPlan(mp) {
        setEditPlan(true);
        setSelectedPlan(mp);
      }

      function handleSavePlan(newPlan) {
        console.log(newPlan)
        const updatedPlan = mealplan.map((mp) => {
          return mp?.id === newPlan.id ? newPlan : mp;
        })
        
        setMealplan(updatedPlan);
        console.log('newPlan', newPlan.id);
      
      
        setEditPlan(false);
        setSelectedPlan([]);
      
        const mealPlanData = {
          user_id: newPlan.user_id,
          day_of_week: newPlan.dayOfWeek,
          meal_time: newPlan.mealTime,
          meal_id: newPlan.meal_id,
        };
      
        fetch(`/api/meal_plan/${mp.id}`, {
          
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },  
          body: JSON.stringify(mealPlanData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            handleFetch(currentUser.id);
          })
          .catch(error => {
            console.log('Error updating meal plan', error);
          });
      }
      
      function handleDeletePlan(newPlan) {
        const updatedPlan = mealplan.filter(mp => mp.id !== selectedPlan.id);
      
        setMealplan(updatedPlan);
        setEditPlan(false);
        setSelectedPlan(null);
      
        fetch(`/api/meal_plan/${selectedPlan.id}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            handleFetch(currentUser.id);
          })
          .catch(error => {
            console.log('Error deleting meal plan', error);
          });
      }
      


      
   
  
      return (
        <View style={styles.cardContainer}>
          {editPlan ? (
            <EditMealPlanForm mp={mp} onSaveChanges={handleSavePlan} onDelete={handleEditPlan} />
          ) : (
            <>
              <Text style={styles.title}>{mp.day_of_week} - {mp.meal_time}</Text>
              <Text style={styles.description}>{meal.name}</Text>
              <Text style={styles.category}>{meal.category}</Text>
              <Text style={styles.description}>{meal.description}</Text>
              <Button color="#f4511e" style={styles.button} title="Edit Plan" onPress={handleEditPlan} />
              <Button color="#f4511e" style={styles.button} title="Delete Plan" onPress={handleDeletePlan} />
            </>
          )}
        </View>
      );
    }
  
   
  
  
  
  
  
  
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Meal Plan</Text>
      <Button
        color="#f4511e"
        style={styles.button}
        title="Go to Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <Button
        color="#f4511e"
        style={styles.button}
        title="Go back"
        onPress={() => props.navigation.goBack()}
      />
      <Button
        color="#f4511e"
        style={styles.button}
        title="Get Meal Plan"
        onPress={() => handleFetch(currentUser.id)}
      />
      {loading && <Text style={styles.loading}>Loading...</Text>}
      <ScrollView style={{ maxHeight: '80%', marginTop: 20, paddingHorizontal: 10 }}>
      {mealplan && mealplan.length > 0 && mealplan.map(mp => mp && <MealplanCard key={mp.id} mp={mp} />)}

      </ScrollView>
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
  cardContainer: {
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
  },
  card: {
    // width: '100%',
    // height: 200,
    // marginVertical: 10,
    // padding: 10,
    // backgroundColor: '#0000',
    // marginTop: 10,
    // maxWidth: 1000,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: '#999',
  },
  
 
});


export default Mealplan;
