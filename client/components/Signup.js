import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';



function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
      navigation.navigate('Login');
    })
    .catch((error) => {
      console.error("Error:", error);
    })
  }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon2.png')} style={styles.logo} />
      
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.form}
          autoCapitalize="none"
          autoCompleteType="username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder='Username'
        />
              
        <TextInput
          style={styles.form}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCompleteType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='Password'
        />
        
        <TextInput
         style={styles.form}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCompleteType="password"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          placeholder='Confirm Password'
        />
        <View style={styles.buttonContainer}>
        <Button
          color="#daa520" style={styles.button}
          title={isLoading ? "Loading..." : "Sign Up"}
          onPress={handleSubmit}
          disabled={isLoading}
        />
      <Button color="#daa520" style={styles.button} title="Have an account? Login" onPress={() => navigation.navigate('Login')}/>
     
      {errors.map((error, index) => (
        <Text key={index} style={{ color: 'red' }}>
          {error}
        </Text>
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
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
    
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    backgroundColor: 'white',
  },
  text: {
    color: '#daa520',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#daa520',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});




export default Signup;





