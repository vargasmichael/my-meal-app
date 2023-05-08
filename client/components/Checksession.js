import  React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

function Checksession(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handlesession() {
        fetch('/api/checksession')
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
     }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Check Session</Text>
            <Button title="Check Session" onPress={handlesession} />
        </View>
    )
    }
export default Checksession;