import  React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import PopupDialog from 'react-native-popup-dialog';
import { useNavigation } from '@react-navigation/native';

function Login({ setU, user}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigation();

  function handleLogin() {
    

    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(setU);
        // setU(data);
        console.log(data);
        setUsername("");
        setPassword("");
        setShowPopup(true);
        setIsLoading(false);
        navigation.navigate('Mealplan');
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }

  function handleLogout(props) {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((r) => {
      console.log("User logged out");
    })
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon2.png')} style={styles.logo} />
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.form}
        autoCapitalize="none"
        autoCompleteType="username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
        clearTextOnFocus={true}
      />
      <TextInput
        style={styles.form}
        secureTextEntry={true}
        autoCapitalize="none"
        autoCompleteType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        clearTextOnFocus={true}
      />
      <View style={styles.buttonContainer}>
      <Button color="#daa520" style={styles.button} title="Login" onPress={handleLogin} />
      <Button color="#daa520" style={styles.button} title="Logout" onPress={handleLogout}/>
      {/* <Button color="#f4511e" style={styles.button} title="Go to Home" onPress={() => {props.navigation.push('Homescreen')}}/> */}
      </View>
      <PopupDialog
        visible={showPopup}
        onTouchOutside={() => {
          setShowPopup(false);
        }}
      >
        <View>
          <Text>{username} logged in</Text>
        </View>
      </PopupDialog>
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
  tabNavigator: {
    zIndex: 10,
  },
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
    backgroundColor: '#dcdcdc',
    multiline: true,
  },
  text: {
    color: '#daa520',
    fontSize:     50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Login;





  
