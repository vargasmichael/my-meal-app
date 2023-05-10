import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Picker } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

function EditMealPlanForm({ mp, onSaveChanges, onDelete }) {
  console.log(mp);
  const [dayOfWeek, setDayOfWeek] = useState(mp ? mp.dayOfWeek : ''); // Use the meal object instead of mealPlan
  const [mealTime, setMealTime] = useState(mp ? mp.mealTime : ''); // Use the meal object instead of mealPlan

  function handleSaveChanges() {
    const updatedMealPlan = {
      ...mp,
      id: mp.id,
      dayOfWeek: dayOfWeek,
      mealTime: mealTime,
    };
    onSaveChanges(updatedMealPlan);
  }

  function handleDelete() {
    props.onDelete();
  }


  return (
    <View>
      <Text>Edit Meal Plan</Text>
      <View style={styles.formDayOfWeek}>
        <Picker
          value={dayOfWeek}
          onValueChange={setDayOfWeek}
          placeholder="Day of the week"
        >
          <Picker.Item label="Select Day of the Week..." value="" />
          <Picker.Item label="Sunday" value="Sunday" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
        </Picker>
      </View>
      <View style={styles.formMealTime}>
        <Picker
          value={mealTime}
          onValueChange={setMealTime}
          placeholder="Meal time"
        >
          <Picker.Item label="Select Meal Time..." value="" />
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Snack" value="Snack" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button color="#f4511e" style={styles.button} title="Save" onPress={handleSaveChanges} />
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
  formMealTime: {
      height: 40,
      borderColor: "black",
      borderWidth: 1,
      width: 400,
      marginBottom: 10,
      paddingHorizontal: 10,
  },
  formDayOfWeek: {
      height: 100,
      borderColor: "black",
      borderWidth: 1,
      width: 500,
      marginBottom: 10,
      paddingHorizontal: 10,
  },
});


export default EditMealPlanForm;

// match the returns in the other forms