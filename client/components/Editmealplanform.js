import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function EditMealPlanForm({ mealPlan, onSubmit, onCancel }) {
  const [dayOfWeek, setDayOfWeek] = useState(mealPlan.dayOfWeek);
  const [mealTime, setMealTime] = useState(mealPlan.mealTime);

  const handleSubmit = () => {
    onSubmit({ ...mealPlan, dayOfWeek, mealTime });
  };

  return (
    <View>
      <Text>Edit Meal Plan</Text>
      <TextInput
        value={dayOfWeek}
        onChangeText={setDayOfWeek}
        placeholder="Day of the week"
      />
      <TextInput
        value={mealTime}
        onChangeText={setMealTime}
        placeholder="Meal time"
      />
      <Button title="Save" onPress={handleSubmit} />
      <Button title="Delete" onPress={oneDelete} />
    </View>
  );
}

export default EditMealPlanForm;
