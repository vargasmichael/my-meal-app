import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';



function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setErrors([]);
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      })
    })
    .then((r) => r.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Sign Up</Text>
      <Button color="#f4511e" style={styles.button} title="Already have an account? Login" onPress={() => navigation.navigate('Login')}/>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.form}
          autoCapitalize="none"
          autoCompleteType="username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
              <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.form}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCompleteType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
         style={styles.form}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCompleteType="password"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
        />
        <Button
          color="#f4511e" style={styles.button}
          title={isLoading ? "Loading..." : "Sign Up"}
          onPress={handleSubmit}
          disabled={isLoading}
        />
     
      {errors.map((error, index) => (
        <Text key={index} style={{ color: 'red' }}>
          {error}
        </Text>
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




export default Signup;





