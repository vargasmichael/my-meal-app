import  React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import PopupDialog from 'react-native-popup-dialog';

function Login({ setU, user}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  function handleLogin(props) {
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
      <Button color="#f4511e" style={styles.button} title="Login" onPress={handleLogin} disabled={isLoading}/>
      <Button color="#f4511e" style={styles.button} title="Logout" onPress={handleLogout}/>
      <Button color="#f4511e" style={styles.button} title="Go to Home" onPress={() => {props.navigation.push('Homescreen')}}/>
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
  },
  text: {
    color: '#f4511e',
    fontSize:     20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;





  
// const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const opacityValue = useState(new Animated.Value(0))[0];



//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <TextInput>
//         <Label>Username</Label>
//         <Input
//           style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//           autoCapitalize="none"
//           autoCompleteType="username"
//           value={username}
//           onChangeText={(text) => setUsername(text)}
//         />
//       </TextInput>
//       <TextInput>
//         <Label>Password</Label>
//         <Input
//           style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//           secureTextEntry={true}
//           autoCapitalize="none"
//           autoCompleteType="password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//       </TextInput>
//       <TextInput>
//         <Button
//           title={isLoading ? "Loading..." : "Login"}
//           onPress={handleSubmit}
//           disabled={isLoading}
//         />
//       </TextInput>
//       <Animated.View style={{ opacity: opacityValue }}>
//         {errors.map((err) => () => <Error key={err}>{err}</Error>)}
//       </Animated.View>
